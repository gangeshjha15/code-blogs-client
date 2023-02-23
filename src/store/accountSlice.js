import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "account",
    initialState: {name:'', email:'', id:''},
    reducers: {
        setUserAccount: (state, action) => action.payload,
    }
});

export const { setUserAccount } = accountSlice.actions;
export default accountSlice.reducer;