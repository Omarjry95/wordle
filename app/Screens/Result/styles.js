import {StyleSheet} from "react-native";
import {theme} from "../../Design/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    upperContainer: {
        width: '100%',
        paddingTop: 100,
        paddingHorizontal: 30,
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        marginBottom: 30,
        fontFamily: theme.primaryFont.regular,
        fontSize: 16,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        elevation: 6
    },
    buttonText: {
        fontFamily: theme.primaryFont.regular,
        fontSize: 16,
        textAlign: 'center'
    },
    bottomContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 120,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    photo: {
        maxWidth: '100%',
        maxHeight: '100%'
    }
})