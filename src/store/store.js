import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        account: accountReducer,
    },
});

export default store;