import { createSlice } from "@reduxjs/toolkit";

type accessTokenState = string;

const initialState: accessTokenState = "";


const accessTokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        setToken(_state, action) {
            return action.payload;
        },
        clearToken() {
            return "";
        },
    },
})

export default accessTokenSlice.reducer;
export const { setToken, clearToken } = accessTokenSlice.actions;

