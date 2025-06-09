import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../../types/users";
import { getProfileInfoAction, logoutAction } from "../../actions/profileActions";

interface ProfileState {
    profileInfo: Profile | null;
    isLoading: boolean;
    error: string;
}

const initialState: ProfileState = {
    profileInfo: null,
    isLoading: false,
    error: "",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfileInfoAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfileInfoAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.profileInfo = action.payload;
            })
            .addCase(getProfileInfoAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.isLoading = false;
                state.error = "";
                state.profileInfo = null;
            })
            .addCase(logoutAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;
