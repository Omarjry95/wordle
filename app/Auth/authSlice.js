import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

const { actions, reducer } = authSlice;

export const { updateAuthState } = actions;

export const authSelector = (state) => state.auth;

export default reducer;