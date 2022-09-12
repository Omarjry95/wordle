import * as React from 'react';
import { useFonts, Lato_400Regular, Lato_700Bold, Lato_700Bold_Italic } from '@expo-google-fonts/lato';
import {initFirebase} from "./app/Settings/Firebase/Init";
import { Provider as ReduxProvider } from 'react-redux'
import configureAppStore from "./app/Redux/store";
import Auth from "./app/Auth";
import Navigation from "./app/Navigation";

export default function App() {

    initFirebase();

    const [loaded] = useFonts({
        primaryFontRegular: Lato_400Regular,
        primaryFontBold: Lato_700Bold,
        primaryFontBoldItalic: Lato_700Bold_Italic
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
