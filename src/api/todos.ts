import axios from "axios";
import {
    Todo,
    TodoInfo,
    MetaResponse,
    TodoRequest,
    TodosFilter,
} from "../types/todos";

const BASE_URL = "https://easydev.club/api/v1";

const todosAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

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
        const response = await todosAPI.get<MetaResponse<Todo, TodoInfo>>(`/todos`, { params: { filter } });

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
