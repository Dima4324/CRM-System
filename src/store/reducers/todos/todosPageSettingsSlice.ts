import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodosFilter } from "../../../types/todos";

export interface todosPageSettingsState {
    filter: TodosFilter;
    editingTodosId: number[];
}

const initialState: todosPageSettingsState = {
    filter: "all",
    editingTodosId: [],
};

const todosPageSettingsSlice = createSlice({
    name: "todosPageSettings",
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<TodosFilter>) {
            state.filter = action.payload;
        },
        addEditingId: (state, action: PayloadAction<number>) => {
            if (!state.editingTodosId.includes(action.payload)) {
                state.editingTodosId.push(action.payload);
            }
        },
        removeEditingId: (state, action: PayloadAction<number>) => {
            state.editingTodosId = state.editingTodosId.filter(
                (id) => id !== action.payload
            );
        },
    },
});

export default todosPageSettingsSlice.reducer;

export const { changeFilter, addEditingId, removeEditingId } = todosPageSettingsSlice.actions;
