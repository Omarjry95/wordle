import React, {useMemo} from "react";
import {styles} from "../styles";
import { View, Text, TouchableOpacity } from "react-native";

export default function Center(props) {

    const { navigation, disabledPlay } = props;

    const buttonStyle = useMemo(() => {
        return {
            borderColor: disabledPlay ? 'gray' : 'black',
            elevation: disabledPlay ? 0 : 6
        }
    }, [disabledPlay]);

    const headToPlayground = () => {
        navigation.navigate("Playground");
    }

    return (
        <View style={styles.centerContainer}>
            <TouchableOpacity
                style={{...styles.button, ...buttonStyle}}
                disabled={disabledPlay}
                onPress={() => headToPlayground()}
            >
                {disabledPlay ?
                    (<Text style={{...styles.buttonText, color: 'gray' }}>
                        Vous avez atteint votre limite de mots par jour. Veuillez revenir demain.
                    </Text>) :
                    (<Text style={styles.buttonText}>
                        Résolvez le mystère du jour et recevez votre <Text style={styles.customButtonText}>Good Vibe</Text>
                    </Text>)}
            </TouchableOpacity>
        </View>
    )
}