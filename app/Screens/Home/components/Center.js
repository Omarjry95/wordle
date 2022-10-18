import React from "react";
import {styles} from "../styles";
import { View, Text, TouchableOpacity } from "react-native";

export default function Center(props) {

    const { navigation } = props;

    const headToPlayground = () => {
        navigation.navigate("Playground");
    }

    return (
        <View style={styles.centerContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => headToPlayground()}
            >
                <Text style={styles.buttonText}>
                    Résolvez le mystère du jour et recevez votre <Text style={styles.customButtonText}>Good Vibe</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}