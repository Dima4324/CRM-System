import { combineReducers, configureStore } from "@reduxjs/toolkit"
import profileReducer from "./reducers/user/profileSlice"


const rootReducer = combineReducers({
    profile: profileReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch