import axios from "axios";
import {
    Todo,
    TodoInfo,
    MetaResponse,
    TodoRequest,
    TodosFilter,
} from "../types/todos";
import { AuthData, Profile, RefreshToken, Token, UserRegistration } from "../types/users";

const BASE_URL = "https://easydev.club/api/v1";

const todosAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});


// users
export const register = async (userData: UserRegistration): Promise<Profile> => {
    try {
        const response = await todosAPI.post<Profile>("/auth/signup", userData);

        if (response.status !== 201) {
            throw new Error("Ошибка при регистрации");
        }

        const data = response.data;

        return data;

    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

export const login = async (authData: AuthData): Promise<Token> => {
    try {
        const response = await todosAPI.post<Token>("/auth/login", authData);

        if (response.status !== 200) {
            throw new Error("Ошибка при входе");
        }

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

export const logout = async (): Promise<string> => {
    try {
        const response = await todosAPI.post<string>("/auth/logout");

        if (response.status !== 200) {
            throw new Error("Ошибка при выходе");
        }

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

export const refreshToken = async (refreshToken: RefreshToken): Promise<Token> => {
    try {
        const response = await todosAPI.post<Token>("/auth/logout", { refreshToken });

        if (response.status !== 200) {
            throw new Error("Ошибка при обновлении токена");
        }

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}







// Todos 
export const addTodo = async (bodyRequest: TodoRequest): Promise<Todo> => {
    try {
        const response = await todosAPI.post<Todo>("/todos", bodyRequest);

        if (response.status !== 200) {
            throw new Error("Ошибка при загрузке данных");
        }

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
        const response = await todosAPI.get<MetaResponse<Todo, TodoInfo>>(`/todos`, { params: { filter } });

        if (response.status !== 200) {
            throw new Error("Ошибка при загрузке данных");
        }

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

        if (response.status !== 200) {
            throw new Error("Ошибка при загрузке данных");
        }

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

        if (response.status !== 200) {
            throw new Error("Ошибка при загрузке данных");
        }

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};
