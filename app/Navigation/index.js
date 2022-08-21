import * as React from 'react';
import Login from "../Screens/Login";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";
import {authSelector} from "../Auth/authSlice";
import Home from "../Screens/Home";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const authState = useSelector(authSelector);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!authState.isAuthenticated ?
                <Stack.Group>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                </Stack.Group>
                :
                <Stack.Group>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </Stack.Group>}
            </Stack.Navigator>
        </NavigationContainer>
    )
}