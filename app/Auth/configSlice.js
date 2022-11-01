import {createSlice} from "@reduxjs/toolkit";
import {theme} from "../Design/theme";

const initialState = {
    statusBarBackgroundColor: theme.primaryColor
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        updateConfig: (state, action) => {
            Object.assign(state, action.payload);
        },
        resetConfig: (state) => {
            Object.assign(state, initialState);
        }
    }
});

const { actions, reducer } = configSlice;

export const { updateConfig, resetConfig } = actions;

export const configSelector = (state) => state.config;

export default reducer;