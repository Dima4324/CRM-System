import { combineReducers, configureStore } from "@reduxjs/toolkit"
import todoReducer from "./reducers/todos/todoSlice"
import todosPageSettingsReducer from "./reducers/todos/todosPageSettingsSlice"
import profileReducer from "./reducers/user/profileSlice"


const rootReducer = combineReducers({
    todo: todoReducer,
    todosPageSettings: todosPageSettingsReducer,
    profile: profileReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch