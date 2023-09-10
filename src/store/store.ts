import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groups/groups.reducer";
import eachGroupReducer from "./group/each-group.reducer";

const store = configureStore({
    reducer: {
        groups: groupsReducer,
        eachGroup: eachGroupReducer
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store