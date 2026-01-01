import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authentication/auth-slice";
import { profileReducer } from "../features/profile/profile-slice";
import { documentReducer } from "../features/documents/document-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    document: documentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
