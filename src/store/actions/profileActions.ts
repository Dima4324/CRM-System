import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/users";
import { getProfileInfo, logout, tokensStorage } from "../../api/user";
import axios from "axios";

export const getProfileInfoAction = createAsyncThunk<
    Profile,
    void,
    { rejectValue: string }
>("user/getProfileInfoAction", async (_, thunkAPI) => {
    try {
        const profile = await getProfileInfo();

        return profile;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка получения задач");
    }
});

export const logoutAction = createAsyncThunk<void, void>(
    "user/logoutAction",
    async (_, thunkAPI) => {
        try {
            await logout();
            tokensStorage.deleteTokens();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue("Ошибка выхода из системы");
        }
    }
);
