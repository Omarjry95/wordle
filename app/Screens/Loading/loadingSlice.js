import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        updateLoadingState: (state, action) => {
            state.loading = action.payload;
        }
    }
});

const { actions, reducer } = loadingSlice;

export const { updateLoadingState } = actions;

export const loadingSelector = (state) => state.loading;

export default reducer;