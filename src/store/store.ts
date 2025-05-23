import { combineReducers, configureStore } from "@reduxjs/toolkit"
import todoReducer from "./reducers/todos/todoSlice"
import todosPageSettingsSlice from "./reducers/todos/todosPageSettingsSlice"

const rootReducer = combineReducers({
    todo: todoReducer,
    todosPageSettings: todosPageSettingsSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch