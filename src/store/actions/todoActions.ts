import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../../api/todos";
import {
    MetaResponse,
    Todo,
    TodoInfo,
    TodoRequest,
    TodosFilter,
} from "../../types/todos";
import axios from "axios";
import { todosPageSettingsState } from "../reducers/todos/todosPageSettingsSlice";

export const getTodosAction = createAsyncThunk<
    MetaResponse<Todo, TodoInfo>,
    TodosFilter,
    { rejectValue: string }
>("todo/getTodosAction", async (filter, thunkAPI) => {
    try {
        const meta = await getTodos(filter);
        return meta;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка получения задач");
    }
});

export const createTodoAction = createAsyncThunk<
    Todo,
    TodoRequest,
    { rejectValue: string; state: { todosPageSettings: todosPageSettingsState } }
>("todo/createTodoAction", async (bodyRequest, thunkAPI) => {
    try {
         const data = await addTodo(bodyRequest);
        const { filter } = thunkAPI.getState().todosPageSettings;
        await thunkAPI.dispatch(getTodosAction(filter));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка добавления задачи");
    }
});

export const updateTodoAction = createAsyncThunk<
    Todo,
    { id: number; bodyRequest: TodoRequest },
    { rejectValue: string; state: { todosPageSettings: todosPageSettingsState } }
>("todo/updateTodoAction", async ({ id, bodyRequest }, thunkAPI) => {
    try {
        const data = await updateTodo(id, bodyRequest);
        const { filter } = thunkAPI.getState().todosPageSettings;
        await thunkAPI.dispatch(getTodosAction(filter));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка обновления задачи");
    }
});

export const deleteTodoAction = createAsyncThunk<
    string,
    number,
    { rejectValue: string; state: { todosPageSettings: todosPageSettingsState } }
>("todo/deleteTodoAction", async (id, thunkAPI) => {
    try {
        const data = await deleteTodo(id);
        const { filter } = thunkAPI.getState().todosPageSettings;
        await thunkAPI.dispatch(getTodosAction(filter));
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Ошибка обновления задачи");
    }
});
