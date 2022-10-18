import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import {texts} from "./constants";
import useBackHandler from "../../Utils/Hooks/UseBackHandler";

export default function Result(props) {

    const { navigation, route } = props;
    const { attempts, sceneUrl } = route.params;

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
        </View>
    )
}