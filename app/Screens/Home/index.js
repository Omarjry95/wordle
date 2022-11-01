import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { View, ImageBackground} from 'react-native';
import { styles } from './styles';
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../Auth/authSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Avatar from "./components/Avatar";
import Menu from "./components/Menu";
import Center from "./components/Center";
import {child, get, ref as databaseRef, getDatabase} from "firebase/database";
import {statusSelector} from "../../Auth/statusSlice";
import {homeSelector, setDashboardStatistics} from "./homeSlice";
import {getTodayDateFormatted} from "../../Utils/Date/dateUtils";
import {useFocusEffect} from "@react-navigation/native";

const Home = (props) => {

    const { navigation } = props;

    const [avatar, setAvatar] = useState('');
    const [loadedStatistics, setLoadedStatistics] = useState(false);

    const { user } = useSelector(authSelector);
    const { status } = useSelector(statusSelector);
    const { successRatio, successRate, disabledPlay } = useSelector(homeSelector);

    const { id: userId, displayName, photoURL } = user;

    const doneStatus = useMemo(() => status.find((s) => s.value === "DONE"), [status]);

    const dispatch = useDispatch();

    useEffect(() => {
        getDownloadURL(ref(getStorage(), photoURL))
            .then((url) => setAvatar(url));

        getWordsStatistics();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getDownloadURL(ref(getStorage(), photoURL))
                .then((url) => setAvatar(url));

            getWordsStatistics();
            }, [])
    )

    const getWordsStatistics = async () => {
        const wordsSnapshot = await get(child(databaseRef(getDatabase()), 'words'));

        if (wordsSnapshot.exists()) {
            const wordsBySnapshot = wordsSnapshot.val();

            const words = Object.keys(wordsBySnapshot).map((key) => {
                return { id: key, ...wordsBySnapshot[key] }
            });

            const completedWords = words.filter((word) => word.solvers && word.solvers[userId] && word.solvers[userId].status === doneStatus.id);
            const todayWord = completedWords.find((word) => word.solvers[userId].date === getTodayDateFormatted());

            dispatch(setDashboardStatistics({
                successRatio: completedWords.length / words.length,
                successRate: completedWords.length,
                disabledPlay: !!todayWord
            }));

            setLoadedStatistics(true);
        }
    }

    const avatarProps = {
        uri: avatar,
        displayName,
        successRatio
    }

    const centerComponentProps = {
        navigation,
        disabledPlay
    }

    return (
        user && avatar && loadedStatistics ?
            (<View style={styles.container}>
                <ImageBackground
                    source={require('../../../assets/images/home-background.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />

                <Avatar {...avatarProps} />

                <Center {...centerComponentProps} />

                <Menu successRate={successRate} />
            </View>)
            :
            (<View style={styles.container}>

            </View>)
    )
}

export default Home;