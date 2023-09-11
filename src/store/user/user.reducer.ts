import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";


export interface UserState {
    value: User | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const initialState: UserState = {
    value: null,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                value: action.payload,
            }
        }
    }

})

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;


