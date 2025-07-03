import axios from "axios";
import { tokensStorage } from "./user";

const BASE_URL = "https://easydev.club/api/v1";

export const easydevApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

easydevApi.interceptors.request.use((config) => {
    const accessToken = tokensStorage.accessToken;

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});