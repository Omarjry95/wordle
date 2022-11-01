import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { styles } from './styles';
import {images, texts} from "./constants";
import useBackHandler from "../../Utils/Hooks/UseBackHandler";
import {resetConfig, updateConfig} from "../../Auth/configSlice";
import {theme} from "../../Design/theme";
import {useDispatch} from "react-redux";

export default function Result(props) {

    const { navigation, route } = props;
    const { attempts, sceneUrl } = route.params;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateConfig({
            statusBarBackgroundColor: 'white'
        }));

        return () => { dispatch(resetConfig()); }
    }, []);

    useBackHandler(navigation);

    const getText = () => {
        const text = texts.find((message) => message.id === attempts);

        return text ? text.message : "Dommage ! Tu es malchanceuse aujourd'hui. Mais tu sais ? Tu peux réessayer immédiatement. Allez ! N'abandonnes pas !"
    }

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Text style={styles.text}>{getText()}</Text>

                <View style={styles.buttonContainer}>
                    {attempts > 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate("Cinema", { sceneUrl })}
                        >
                            <Text style={styles.buttonText}>Je veux découvrir mon cadeau du jour</Text>
                        </TouchableOpacity>) :
                        (<TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={styles.buttonText}>Je veux rejouer</Text>
                        </TouchableOpacity>)}
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Image
                    source={images[attempts > 0 ? 'winner_' + attempts : 'loser']}
                    style={styles.photo}
                    resizeMode={attempts > 0 ? 'stretch' : 'contain'}
                />
            </View>
        </View>
    )
}