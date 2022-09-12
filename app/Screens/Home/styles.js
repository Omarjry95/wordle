import { StyleSheet } from "react-native";
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
        paddingTop: 60,
        paddingBottom: 30,
        backgroundColor: theme.primaryColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    // Avatar Styles
    avatarContainer: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    avatarWrapper: {
        ...getCircularElement(210),
        marginBottom: 15,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    avatar: {
        ...getCircularElement(170),
        position: 'absolute',
        top: 20,
        left: 20
    },
    displayName: {
        color: 'black',
        fontFamily: theme.primaryFont.bold,
        fontSize: 30
    },
    // Menu Styles
    menuContainer: {
        paddingHorizontal: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    score: {
        marginBottom: 30,
        fontFamily: theme.primaryFont.regular,
        fontSize: 16,
        textAlign: 'center'
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        height: 130,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: theme.primaryColor,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        elevation: 6
    },
    icon: {
        marginBottom: 15
    },
    label: {
        fontFamily: theme.primaryFont.regular,
        textAlign: 'center'
    },
    // Center Styles
    centerContainer: {
        paddingHorizontal: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: theme.primaryColor,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        elevation: 6
    },
    buttonText: {
        fontFamily: theme.primaryFont.regular,
        fontSize: 18,
        textAlign: 'center'
    },
    customButtonText: {
        fontFamily: theme.primaryFont.boldItalic,
    }
});