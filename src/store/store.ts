import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import expensesReducer from "./expenses/expenses.reducer";
import groupsReducer from "./groups/groups.reducer";
import { userReducer } from "./user/user.reducer";

const store = configureStore({
    reducer: {
        groups: groupsReducer,
        user:userReducer,
        expenses:expensesReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger)
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store