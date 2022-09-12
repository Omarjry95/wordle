import React, {useEffect, useState} from 'react';
import { View} from 'react-native';
import { styles } from './styles';
import {useSelector} from "react-redux";
import {authSelector} from "../../Auth/authSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Avatar from "./components/Avatar";
import Menu from "./components/Menu";
import Center from "./components/Center";

const Home = (props) => {

    const { navigation } = props;

    const [avatar, setAvatar] = useState('');

    const { user } = useSelector(authSelector);

    const { displayName, photoURL } = user;

    useEffect(() => {
        getDownloadURL(ref(getStorage(), photoURL))
            .then((url) => setAvatar(url));
    }, []);

    const avatarProps = {
        uri: avatar,
        displayName
    }

    const centerComponentProps = {
        navigation
    }

    return (
        user && avatar ?
            (<View style={styles.container}>
                <Avatar {...avatarProps} />
                <Center {...centerComponentProps} />
                <Menu />
            </View>)
            :
            (<View style={styles.container}>

            </View>)
    )
}

export default Home;