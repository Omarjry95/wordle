import { StyleSheet, Dimensions } from "react-native";
import {theme} from "../../Design/theme";

export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingHorizontal: 25,
        backgroundColor: theme.primaryColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    welcomeSentence: {
        fontFamily: theme.primaryFont.bold,
        fontSize: 22
    },
    welcomeText: {
        marginBottom: 30,
        fontFamily: theme.primaryFont.bold,
        fontSize: 22
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    inputLabel: {
        marginBottom: 10,
        fontFamily: theme.primaryFont.regular,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 5,
        elevation: 8,
        fontFamily: theme.primaryFont.regular,
    },
    errorMessage: {
        paddingHorizontal: 20,
        marginTop: 30,
        fontFamily: theme.primaryFont.regular,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: theme.primaryColor,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    buttonLabel: {
        fontFamily: theme.primaryFont.regular,
        fontSize: 16,
        textAlign: 'center',
    }
})