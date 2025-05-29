import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/users";
import { getProfileInfo } from "../../api/todos";
import axios from "axios";

export const getProfileInfoAction = createAsyncThunk<
    Profile,
    string,
    { rejectValue: string }
>("user/getProfileInfoAction", async (accessToken, thunkAPI) => {
    try {
        const profile = await getProfileInfo(accessToken);

        return profile;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка получения задач");
    }
});