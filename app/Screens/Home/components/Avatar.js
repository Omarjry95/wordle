import React from "react";
import {styles} from "../styles";
import * as Progress from "react-native-progress";
import { Image, View, Text } from "react-native";

export default function Avatar(props) {

    const { displayName, uri } = props;

    return (
        <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
                <Progress.Circle
                    animated
                    size={195}
                    progress={0.8}
                    color={'white'}
                    borderWidth={0}
                    allowFontScaling={false}
                />

                <Image
                    style={styles.avatar}
                    source={{ uri }}
                />
            </View>

            <Text style={styles.displayName}>{displayName}</Text>
        </View>
    )
}