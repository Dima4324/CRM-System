const BASE_URL = "https://easydev.club/api/v1/todos";

export const addTodo = async (bodyRequest) => {
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

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Ошибка:", error);

    }
}

export const getTodos = async (filter) => {
    try {
        const response = await fetch(`${BASE_URL}?filter=${filter}`);

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

export const updataTodo = async (id, bodyRequest) => {

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

    } catch (error) {
        console.error("Ошибка:", error);
    }
}

export const deleteTodo = async (id) => {
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
    } catch (error) {
        console.error("Ошибка:", error);
        
    }
}
