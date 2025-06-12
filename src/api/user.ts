import {
    AuthData,
    Profile,
    RefreshToken,
    Token,
    UserRegistration,
} from "../types/users";
import { easydevApi } from "./easydevApi";


class TokensStorage {
    private _refreshToken: string = "";
    private _accessToken: string = "";

    set accessToken(token: string) {
        this._accessToken = token;
    }

    get accessToken() {
        return this._accessToken;
    }

    set refreshToken(token: string) {
        this._refreshToken = token;
        localStorage.setItem("refreshToken", this._refreshToken);
    }

    get refreshToken() {
        return localStorage.getItem("refreshToken") || "";
    }

    public deleteTokens() {
        this._accessToken = "";
        this._refreshToken = "";
        localStorage.removeItem("refreshToken");
    }
}

export const tokensStorage = new TokensStorage();

export const register = async (
    userData: UserRegistration
): Promise<Profile> => {
    try {
        const response = await easydevApi.post<Profile>(
            "/auth/signup",
            userData
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const login = async (authData: AuthData): Promise<Token> => {
    try {
        const response = await easydevApi.post<Token>("/auth/signin", authData);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const refreshTokenRequest = async (
    refreshToken: RefreshToken
): Promise<Token> => {
    try {
        const response = await easydevApi.post<Token>(
            "/auth/refresh",
            refreshToken
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const logout = async (): Promise<string> => {
    try {
        const response = await easydevApi.post<string>("/user/logout");
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const getProfileInfo = async (): Promise<Profile> => {
    try {
        const response = await easydevApi.get<Profile>("/user/profile");

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};
