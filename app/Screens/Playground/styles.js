import {StyleSheet, Dimensions} from "react-native";
import {theme} from "../../Design/theme";

const getCircularElement = (dimension) => {
    return {
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2
    }
}

const getKeyboardElement = () => {
    let width = (Dimensions.get('window').width - 85) / 10;

    return {
        width, height: width + 10
    }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.primaryColor,
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    // Playground Styles
    playgroundContainer: {
        paddingHorizontal: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputGroup: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterDisc: {
        ...getCircularElement(60),
        borderWidth: 3,
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDisplay: {
        fontFamily: theme.secondaryFont.regular,
        fontSize: 38
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 100,
        backgroundColor: theme.primaryColor,
        borderWidth: 2,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: theme.primaryFont.regular,
        fontSize: 14,
        textAlign: 'center'
    },
    // Keyboard Styles
    keyboardContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    lettersRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterContainer: {
        ...getKeyboardElement(),
        backgroundColor: theme.primaryColor,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterText: {
        fontFamily: theme.secondaryFont.regular,
        fontSize: 26,
    },
    lettersWithControls: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    control: {
        height: getKeyboardElement().height,
        paddingHorizontal: 10,
        backgroundColor: theme.primaryColor,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});