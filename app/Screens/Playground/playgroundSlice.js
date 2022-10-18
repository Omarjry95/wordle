import {createSlice} from "@reduxjs/toolkit";
import {getMatrix} from "./utils";

const initialState = {
    currentWord: undefined,
    row: 0,
    column: 0,
    letters: [getMatrix(5, '')],
    winner: false,
    allWords: []
};

const playgroundSlice = createSlice({
    name: 'playground',
    initialState,
    reducers: {
        setPlaygroundState: (state, action) => {
            Object.assign(state, action.payload);
        },
        initPlayground: (state) => {
            Object.assign(state, initialState);
        }
    }
});

const { actions, reducer } = playgroundSlice;

export const { setPlaygroundState, initPlayground } = actions;

export const playgroundSelector = (state) => state.playground;

export default reducer;