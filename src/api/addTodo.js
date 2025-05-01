import { endpoints } from "./config";

export const addTodo = async (bodyRequest) => {
    try {
        const response = await fetch(`${endpoints.todos}`, {
            method: "POST",
            body: JSON.stringify(bodyRequest),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при добавлении задачи");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Ошибка:", error);

    }
}