import {useEffect} from "react";
import { BackHandler } from "react-native";

function useBackHandler(navigation) {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress",
            () => {
                navigation.navigate("Home");

                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    return null;
}

export default useBackHandler;