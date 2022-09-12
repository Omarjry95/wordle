import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";
import {authSelector} from "../Auth/authSlice";
import {ALLOWED_ROUTES, LOADING_ROUTES, RESTRICTED_ROUTES} from "./routes";
import {loadingSelector} from "../Screens/Loading/loadingSlice";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const { isAuthenticated } = useSelector(authSelector);
    const { loading } = useSelector(loadingSelector);

    const getStackGroup = () => {
        function setScreens(routes, array) {
            routes.map((routeProps) => array.push(<Stack.Screen {...routeProps} />));
        }

        let screens = [];

        switch (true) {
            case loading:
                setScreens(LOADING_ROUTES, screens);
                break;
            case isAuthenticated:
                setScreens(RESTRICTED_ROUTES, screens);
                break;
            default:
                setScreens(ALLOWED_ROUTES, screens);
                break;
        }

        return screens;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {getStackGroup()}
            </Stack.Navigator>
        </NavigationContainer>
    )
}