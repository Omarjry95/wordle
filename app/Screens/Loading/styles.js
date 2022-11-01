import {Dimensions, StyleSheet} from "react-native";
import {theme} from "../../Design/theme";

export const styles = StyleSheet.create({
    loaderContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: theme.primaryColor
    },
    loader: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
})