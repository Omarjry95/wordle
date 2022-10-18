import * as React from 'react';
import { useFonts, Lato_400Regular, Lato_700Bold, Lato_700Bold_Italic } from '@expo-google-fonts/lato';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime';
import {initFirebase} from "./app/Settings/Firebase/Init";
import {Provider as ReduxProvider} from 'react-redux'
import configureAppStore from "./app/Redux/store";
import Auth from "./app/Auth";
import Navigation from "./app/Navigation";
import { LogBox } from 'react-native';

export default function App() {

    LogBox.ignoreAllLogs();

    initFirebase();

    const [loaded] = useFonts({
        primaryFontRegular: Lato_400Regular,
        primaryFontBold: Lato_700Bold,
        primaryFontBoldItalic: Lato_700Bold_Italic,
        secondaryFontRegular: CourierPrime_400Regular
    });

    if (!loaded) return null;

    return (
        <ReduxProvider store={configureAppStore()}>
            <Auth>
                <Navigation />
            </Auth>
        </ReduxProvider>
    );
}
