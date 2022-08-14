import React, {useState} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
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

    const onChangeCredentials = (id, text) => {
        setCredentials({
            ...credentials,
            [id]: text
        })
    }

    const submitLogin = () => {
        const { username, password } = credentials;

        const auth = getAuth();

        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                console.log(userCredential.user);
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.welcomeText}>Bienvenue à votre source éternelle d'ondes positives.</Text>

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

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={submitLogin}
                >
                    <Text style={styles.buttonLabel}>Je veux prendre ma dose quotidienne</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login;