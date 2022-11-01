import React, {useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import {theme} from "../../Design/theme";
import {loginInputs} from "./constants";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {updateLoadingState} from "../Loading/loadingSlice";

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: 'hadil.fares@gmail.com',
        password: '02/11/2022'
    });
    const [focused, setFocused] = useState(null);
    const [authError, setAuthError] = useState(false);

    const dispatch = useDispatch();

    const onChangeCredentials = (id, text) => {
        setCredentials({
            ...credentials,
            [id]: text
        })
    }

    const submitLogin = () => {
        const { username, password } = credentials;

        setAuthError(false);

        Keyboard.dismiss();

        dispatch(updateLoadingState(true));

        const auth = getAuth();

        signInWithEmailAndPassword(auth, username, password)
            .catch(() => {
                dispatch(updateLoadingState(false));
                setAuthError(true);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Text style={styles.welcomeSentence}>Bienvenue à votre source</Text>
                <Text style={styles.welcomeText}>éternelle d'ondes positives.</Text>

                {loginInputs.map((input, index, array) => (
                    <View style={{...styles.inputContainer,
                        marginBottom: index !== array.length - 1 ? 20 : 0}}
                    >
                        <Text style={styles.inputLabel}>{input.label}</Text>

                        <TextInput
                            style={{...styles.input,
                                borderWidth: focused === index ? 2 : 0}}
                            selectionColor={theme.primaryColor}
                            secureTextEntry={input.password}
                            value={credentials[input.id]}
                            onChangeText={(text) => onChangeCredentials(input.id, text)}
                            onFocus={() => setFocused(index)}
                            onBlur={() => setFocused(null)}
                        />
                    </View>
                ))}

                {authError &&
                (<Text style={styles.errorMessage}>
                    Votre tentative de connexion a échoué. Veuillez réessayer.
                </Text>)}

                <View style={{...styles.buttonContainer,
                    marginTop: authError ? 20 : 40}}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={submitLogin}
                    >
                        <Text style={styles.buttonLabel}>Je veux prendre ma dose quotidienne</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Login;