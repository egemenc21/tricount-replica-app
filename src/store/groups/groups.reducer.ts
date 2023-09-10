import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "./groups.types";

export interface GroupsState {
    value: Group[];
}

const initialState: GroupsState = {
    value: [],
};

export const groupsSlice = createSlice({
    name: "groups", 
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<Group[]>) => {
            return {
                ...state,
                value: action.payload,
            }
        }
    }

})

export const { setGroups } = groupsSlice.actions

export default groupsSlice.reducer