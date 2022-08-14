import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Login from "./app/Screens/Login";
import {initFirebase} from "./app/Settings/Firebase/Init";

const Stack = createNativeStackNavigator();

export default function App() {

    initFirebase();

    const [loaded] = useFonts({
        ProximaNova: require('./assets/fonts/Proxima-nova/ProximaNova-Regular.otf'),
    });

    if (!loaded) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
