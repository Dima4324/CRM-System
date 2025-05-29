import axios from "axios";
import {
    Todo,
    TodoInfo,
    MetaResponse,
    TodoRequest,
    TodosFilter,
} from "../types/todos";
import {
    AuthData,
    Profile,
    RefreshToken,
    Token,
    UserRegistration,
} from "../types/users";

const BASE_URL = "https://easydev.club/api/v1";

const todosAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

// user
export class RefreshTokenStorage {
    private readonly refreshToken: string;

    constructor(token?: string) {
        this.refreshToken = token ?? "";
    }

    public setToken(token?: string): void {
        localStorage.setItem("refreshToken", token ?? this.refreshToken);
    }

    public getToken(): string | null {
        return localStorage.getItem("refreshToken");
    }

    public deleteToken(): void {
        localStorage.removeItem("refreshToken");
    }
}

export const register = async (
    userData: UserRegistration
): Promise<Profile> => {
    try {
        const response = await todosAPI.post<Profile>("/auth/signup", userData);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const login = async (authData: AuthData): Promise<Token> => {
    try {
        const response = await todosAPI.post<Token>("/auth/signin", authData);

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
        const response = await todosAPI.post<Token>(
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

export const logout = async (accessToken: string): Promise<string> => {
    try {
        const response = await todosAPI.post<string>(
            "/user/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const getProfileInfo = async (accessToken: string): Promise<Profile> => {
    try {
        const response = await todosAPI.get<Profile>(
            "/user/profile",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};



// Todos
export const addTodo = async (bodyRequest: TodoRequest): Promise<Todo> => {
    try {
        const response = await todosAPI.post<Todo>("/todos", bodyRequest);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const getTodos = async (
    filter: TodosFilter
): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await todosAPI.get<MetaResponse<Todo, TodoInfo>>(
            `/todos`,
            { params: { filter } }
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const updateTodo = async (
    id: number,
    bodyRequest: TodoRequest
): Promise<Todo> => {
    try {
        const response = await todosAPI.put<Todo>(`/todos/${id}`, bodyRequest);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const deleteTodo = async (id: number): Promise<string> => {
    try {
        const response = await todosAPI.delete<string>(`/todos/${id}`);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};
