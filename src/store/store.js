import { configureStore } from "@reduxjs/toolkit";
import { Apis } from "@/services/api";
import rootReducer from "./rootreducer";
import { Metadata } from "@/services/metadata";


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(Apis.middleware)
    .concat(Metadata.middleware),
});
