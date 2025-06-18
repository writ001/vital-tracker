import { configureStore } from "@reduxjs/toolkit";
import vitalReducer from "./slices/vitalSlice";

export const store = configureStore({
    reducer: {
        vital: vitalReducer,
    },
});
