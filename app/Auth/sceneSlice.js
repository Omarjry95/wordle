import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    scenes: []
}

const sceneSlice = createSlice({
    name: 'scene',
    initialState,
    reducers: {
        populateScenes: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

const { actions, reducer } = sceneSlice;

export const { populateScenes } = actions;

export const sceneSelector = (state) => state.scene;

export default reducer;