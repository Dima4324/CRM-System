import { Todo, TodoInfo, MetaResponse, TodoRequest, TodosFilter } from "../types/todos";

const BASE_URL = "https://easydev.club/api/v1/todos";

export const addTodo = async (bodyRequest: TodoRequest): Promise<Todo> => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            body: JSON.stringify(bodyRequest),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при добавлении задачи");
        }

        const data: Todo = await response.json();

        return data;

    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

export const getTodos = async (filter: TodosFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${BASE_URL}?filter=${filter}`);

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const data: MetaResponse<Todo, TodoInfo> = await response.json();

        return data;

    } catch (error) {
        console.error('Ошибка:', error);
        
        throw error;
    }
}

export const updateTodo = async (id: number, bodyRequest: TodoRequest): Promise<Todo> => {

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(bodyRequest),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при обновлении задачи");
        }

        const data: Todo = await response.json();

        return data;

    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}

export const deleteTodo = async (id: number): Promise<string> => {
    try {
       const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при удалении задачи");
        }

        const data = await response.text();

        return data;

    } catch (error) {
        console.error("Ошибка:", error);
        throw error;
    }
}
