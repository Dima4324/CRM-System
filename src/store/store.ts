import { combineReducers, configureStore } from "@reduxjs/toolkit"
import profileReducer from "./reducers/user/profileSlice"
import userFiltersReducer from "./reducers/admin/UserFiltersSlice"


const rootReducer = combineReducers({
    profile: profileReducer,
    userFilters: userFiltersReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch