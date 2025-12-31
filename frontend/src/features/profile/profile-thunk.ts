import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApi } from "./ProfileApi";
import {
  mapToCustomError,
  type AsyncPadError,
} from "../../util/error-handler-util"; // Adjusted path based on file location
import type { Profile, ProfileUpdate } from "./types";

export const getProfileThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: AsyncPadError }
>("profile/get", async (_, { rejectWithValue }) => {
  try {
    return await ProfileApi.getMyProfile();
  } catch (err) {
    return rejectWithValue(mapToCustomError(err));
  }
});

export const updateProfileThunk = createAsyncThunk<
  Profile,
  ProfileUpdate,
  { rejectValue: AsyncPadError }
>("profile/update", async (data, { rejectWithValue }) => {
  try {
    return await ProfileApi.updateProfile(data);
  } catch (err) {
    return rejectWithValue(mapToCustomError(err));
  }
});

export const deleteProfileThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: AsyncPadError }
>("profile/delete", async (_, { rejectWithValue }) => {
  try {
    return await ProfileApi.deleteProfile();
  } catch (err) {
    return rejectWithValue(mapToCustomError(err));
  }
});
