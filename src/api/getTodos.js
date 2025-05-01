import { endpoints } from './config.js';

export const getTodos = async (setTodos) => {
    try {
        const response = await fetch(endpoints.todos);

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Ошибка:', error);
    }
}