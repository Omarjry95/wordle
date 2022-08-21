import React, {useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { styles } from './styles';
import {theme} from "../../Design/theme";
import {loginInputs} from "./constants";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: 'omarjry9@gmail.com',
        password: 'loulou95'
    });
    const [focused, setFocused] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState(false);

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

        setLoading(true);

        const auth = getAuth();

        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setAuthError(true);
            });
    }

    return (loading ?
            (<View style={styles.loaderContainer}>
                <Image
                    source={require('../../../assets/loading.gif')}
                    style={styles.loader}
                />
            </View>)
            :
            (<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            </TouchableWithoutFeedback>)
    )
}

export default Login;