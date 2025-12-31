import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProfileThunk,
  getProfileThunk,
  updateProfileThunk,
} from "./profile-thunk";
import type { AsyncPadError } from "../../util/error-handler-util";
import type { Profile } from "./types";
import { logout } from "../authentication/auth-slice";

export interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: AsyncPadError | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Profile
    builder.addCase(getProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.profile = action.payload;
    });
    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });

    // Update Profile
    builder.addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.profile = action.payload;
    });
    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });

    // Delete Profile
    builder.addCase(deleteProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProfileThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.profile = null;
    });
    builder.addCase(deleteProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || null;
    });

    builder.addCase(logout, (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const profileReducer = profileSlice.reducer;
