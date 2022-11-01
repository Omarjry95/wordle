import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [ "loading", "auth", "status", "scene", "playground", "home", "config" ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureAppStore(preloadedState) {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState
    });
}