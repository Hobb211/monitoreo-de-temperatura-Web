import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./features/auth.slice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
