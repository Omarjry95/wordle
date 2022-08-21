import * as React from 'react';
import { useFonts } from 'expo-font';
import {initFirebase} from "./app/Settings/Firebase/Init";
import { Provider as ReduxProvider } from 'react-redux'
import configureAppStore from "./app/Redux/store";
import Auth from "./app/Auth";
import Navigation from "./app/Navigation";

export default function App() {

    initFirebase();

    const [loaded] = useFonts({
        ProximaNova: require('./assets/fonts/Proxima-nova/ProximaNova-Regular.otf'),
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
