import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: []
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

const { actions, reducer } = statusSlice;

export const { setStatus } = actions;

export const statusSelector = (state) => state.status;

export default reducer;