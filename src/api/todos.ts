import axios from "axios";
import {
    Todo,
    TodoInfo,
    MetaResponse,
    TodoRequest,
    TodosFilter,
} from "../types/todos";

const BASE_URL = "https://easydev.club/api/v1";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

export const addTodo = async (bodyRequest: TodoRequest): Promise<Todo> => {
    try {
        const response = await instance.post("/todos", bodyRequest);

        if (response.statusText !== "OK") {
            throw new Error("Ошибка при загрузке данных");
        }

        const data: Todo = response.data;

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
        const response = await instance.get(`/todos?filter=${filter}`);

        if (response.statusText !== "OK") {
            throw new Error("Ошибка при загрузке данных");
        }

        const data: MetaResponse<Todo, TodoInfo> = response.data;

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
        const response = await instance.put(`/todos/${id}`, bodyRequest);

        if (response.statusText !== "OK") {
            throw new Error("Ошибка при загрузке данных");
        }

        const data: Todo = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const deleteTodo = async (id: number): Promise<string> => {
    try {
        const response = await instance.delete(`/todos/${id}`);

        if (response.statusText !== "OK") {
            throw new Error("Ошибка при загрузке данных");
        }

        const data = await response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};
