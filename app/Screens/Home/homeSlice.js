import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    successRatio: 0,
    successRate: 0,
    disabledPlay: true
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setDashboardStatistics: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

const { actions, reducer } = homeSlice;

export const { setDashboardStatistics } = actions;

export const homeSelector = (state) => state.home;

export default reducer;