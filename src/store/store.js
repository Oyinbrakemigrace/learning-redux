import { configureStore } from "@reduxjs/toolkit";
import gboxReducer from "../features/gboxSlice";

export const store = configureStore({
    reducer:{
        gboxData : gboxReducer
    }
})