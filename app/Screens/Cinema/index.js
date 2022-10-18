import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { Video } from 'expo-av';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as NavigationBar from "expo-navigation-bar";
import * as Icons from '@expo/vector-icons';
import {actions} from "./constants";
import useBackHandler from "../../Utils/Hooks/UseBackHandler";

export default function Cinema(props) {

    const { navigation, route } = props;

    const { sceneUrl } = route.params;

    useBackHandler(navigation);

    const videoRef = useRef(null);

    const [sceneUri, setSceneUri] = useState(undefined);
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            .then(() => NavigationBar.setBehaviorAsync('overlay-swipe'))
            .then(() => NavigationBar.setVisibilityAsync("hidden"))
            .then(() => getDownloadURL(ref(getStorage(), sceneUrl)))
            .then((url) => { setSceneUri(url); });

        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                .then(() => NavigationBar.setBehaviorAsync('inset-touch'))
                .then(() => NavigationBar.setVisibilityAsync("visible"));
        }
    }, []);

    const _onPlaybackStatusUpdate = (playbackStatus) => {
        const videoDuration = playbackStatus.durationMillis;

        if (playbackStatus.isLoaded) {
            setLoading(false);
        }

        if (videoDuration) {
            setCounter(Math.floor((videoDuration - playbackStatus.positionMillis) / 1000))
        }
    }

    const getLayerElements = () => {
        switch (true) {
            case loading:
                return <ActivityIndicator size="large" color="white" />;
            case counter > 0:
                return (
                    <TouchableOpacity
                        disabled
                        style={styles.counterContainer}
                    >
                        <Text style={styles.counter}>{counter}</Text>
                    </TouchableOpacity>
                );
            case !counter:
                const buttons = actions.map((action, index, array) => {
                    const IconLibrary = Icons[action.iconLibrary];
                    const parameters = action.id === "1" ? [videoRef] : [navigation];

                    return (
                        <TouchableOpacity
                            style={{...styles.action, marginRight: index !== array.length - 1 ? 20 : 0 }}
                            onPress={() => action.op(...parameters)}
                        >
                            <IconLibrary name={action.icon} size={35} color={"white"} />
                        </TouchableOpacity>
                    )
                });

                return (
                    <View style={styles.actionContainer}>
                        {buttons}
                    </View>
                );
            default:
                return null;
        }
    }

    return (
        <View style={styles.layer}>
            {sceneUri && (
                <Video
                    shouldPlay
                    ref={(component) => videoRef.current = component}
                    style={styles.video}
                    source={{ uri: sceneUri }}
                    volume={1}
                    resizeMode="contain"
                    onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
                />)}

            <View style={styles.container}>
                <View style={styles.overlay} />

                {getLayerElements()}
            </View>
        </View>
    )
}