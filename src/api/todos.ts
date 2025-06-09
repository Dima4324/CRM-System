import {
    Todo,
    TodoInfo,
    MetaResponse,
    TodoRequest,
    TodosFilter,
} from "../types/todos";
import { easydevApi } from "./easydevApi";

export const addTodo = async (bodyRequest: TodoRequest): Promise<Todo> => {
    try {
        const response = await easydevApi.post<Todo>("/todos", bodyRequest);

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
        const response = await easydevApi.get<MetaResponse<Todo, TodoInfo>>(
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
        const response = await easydevApi.put<Todo>(`/todos/${id}`, bodyRequest);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};

export const deleteTodo = async (id: number): Promise<Todo> => {
    try {
        const response = await easydevApi.delete<Todo>(`/todos/${id}`);

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
};