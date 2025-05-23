import { combineReducers } from "@reduxjs/toolkit";
import { Apis } from "@/services/api";
import globalReducer from "./slices/authSlice";
import { Metadata } from "@/services/metadata";


const rootReducer = combineReducers({
  [Apis.reducerPath]: Apis.reducer, 
  [Metadata.reducerPath]: Metadata.reducer, 
  global: globalReducer, 
});

export default rootReducer;
