import { createSlice } from "@reduxjs/toolkit";
import { Todo, TodoInfo } from "../../../types/todos";
import { createTodoAction, getTodosAction, updateTodoAction, deleteTodoAction } from "../../actions/todoActions";

interface TodoState {
    todos: Todo[];
    info: TodoInfo;
    isLoading: boolean;
    error: string;
}

const initialState: TodoState = {
    todos: [],
    info: {
        all: 0,
        completed: 0,
        inWork: 0,
    },
    isLoading: false,
    error: "",
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTodoAction.fulfilled, (state) => {
                state.error = "";
            })
            .addCase(createTodoAction.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(getTodosAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodosAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.todos = action.payload.data;
                state.info = action.payload.info ?? state.info;
            })
            .addCase(getTodosAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTodoAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTodoAction.fulfilled, (state) => {
                state.isLoading = false;
                state.error = "";
            })
            .addCase(updateTodoAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTodoAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTodoAction.fulfilled, (state) => {
                state.isLoading = false;
                state.error = "";
            })
            .addCase(deleteTodoAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export default todoSlice.reducer;
