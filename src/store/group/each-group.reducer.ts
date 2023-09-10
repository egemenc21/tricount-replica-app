import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../groups/groups.types";

export interface EachGroupState {
    value: Group | null
}

const initialState: EachGroupState = {
    value: null
}
const eachGroupSlice = createSlice({
    name: "eachGroup",
    initialState,
    reducers: {
        setEachGroup: (state, action: PayloadAction<Group>) => {
            return {
                ...state,
                value: action.payload,
            }
        }
    },
});
export const { setEachGroup } = eachGroupSlice.actions

export default eachGroupSlice.reducer