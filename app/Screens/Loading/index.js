import React from 'react';
import {styles} from "./styles";
import {Image, View} from "react-native";

export default function Loading() {
    return (
        <View style={styles.loaderContainer}>
            <Image
                source={require('../../../assets/loading.gif')}
                style={styles.loader}
            />
        </View>
    )
}