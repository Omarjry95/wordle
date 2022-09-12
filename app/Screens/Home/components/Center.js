import React from "react";
import {styles} from "../styles";
import { View, Text, TouchableOpacity } from "react-native";

export default function Center(props) {

    const { navigation } = props;

    return (
        <View style={styles.centerContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Playground")}
            >
                <Text style={styles.buttonText}>
                    Résolvez le mystère du jour et recevez votre <Text style={styles.customButtonText}>Good Vibe</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}