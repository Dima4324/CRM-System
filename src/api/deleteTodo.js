import { endpoints } from "./config";

export const deleteTodo = async (id) => {
    try {
       const response = await fetch(`${endpoints.todos}/${id}`, {
            method: "DELETE",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при удалении задачи");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        
    }
}