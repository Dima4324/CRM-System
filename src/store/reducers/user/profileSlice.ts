import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../../types/users";
import { getProfileInfoAction } from "../../actions/profileActions";

interface ProfileState {
    profileInfo: Profile;
    isLoading: boolean;
    error: string;
}

const initialState: ProfileState = {
    profileInfo: {
        id: null,
        username: "",
        email: "",
        date: "",
        isBlocked: false,
        roles: [],
        phoneNumber: "",
    },
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
            });
    },
});

export default profileSlice.reducer;
