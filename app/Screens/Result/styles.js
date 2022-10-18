import {StyleSheet} from "react-native";
import {theme} from "../../Design/theme";

export const styles = StyleSheet.create({
    container: {
        position: "relative",
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    counterContainer: {
        width: 35,
        height: 35,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 35,
        elevation: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 45,
        right: 25
    },
    counter: {
        color: "white",
        fontFamily: theme.primaryFont.regular
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
    }
})