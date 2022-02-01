import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateTimeGreetingReducer from "./slices/date-time-greeting-slice";

const rootReducer = combineReducers({
  dateTimeGreetingReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
