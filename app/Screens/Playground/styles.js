import {StyleSheet} from "react-native";
import {theme} from "../../Design/theme";

const getCircularElement = (dimension) => {
    return {
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2
    }
}

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        backgroundColor: theme.primaryColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputGroup: {
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
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textInput: {
        width: 38,
        height: '100%',
        padding: 0,
        backgroundColor: 'transparent',
        fontSize: 34
    }
});