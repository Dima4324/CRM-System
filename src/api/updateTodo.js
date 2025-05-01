import { endpoints } from "./config";

export const updataTodo = async (id, bodyRequest) => {

    try {
        const response = await fetch(`${endpoints.todos}/${id}`, {
            method: "PUT",
            body: JSON.stringify(bodyRequest),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка при обновлении задачи");
        }

    } catch (error) {
        console.error("Ошибка:", error);
    }
}

