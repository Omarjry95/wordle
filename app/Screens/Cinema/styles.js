import {StyleSheet} from "react-native";
import {theme} from "../../Design/theme";

export const styles = StyleSheet.create({
    layer: {
        backgroundColor: "black",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    video: {
        width: "100%",
        height: "100%"
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        width: "100%",
        height: 15,
        backgroundColor: "black",
        position: "absolute",
        top: 0,
        left: 0
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
        top: 30,
        right: 55
    },
    counter: {
        color: "white",
        fontFamily: theme.primaryFont.regular
    },
    actionContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    action: {
        width: 50,
        height: 50,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 50,
        elevation: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});