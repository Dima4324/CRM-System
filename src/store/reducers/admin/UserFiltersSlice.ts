import { createSlice } from "@reduxjs/toolkit";
import { UserFilters } from "../../../types/admin";

const initialState: UserFilters = {
    search: "",
    sortBy: "",
    sortOrder: "desc",
    isBlocked: "",
    limit: 20,
    offset: 0,
};

const userFiltersSlice = createSlice({
    name: "UserFilters",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        setIsBlocked: (state, action) => {
            state.isBlocked = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
    },
});

export default userFiltersSlice.reducer;

export const {
    setSearch,
    setSortBy,
    setSortOrder,
    setIsBlocked,
    setLimit,
    setOffset,
} = userFiltersSlice.actions;
