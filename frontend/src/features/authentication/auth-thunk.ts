import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "./AuthApi";
import {
  mapToCustomError,
  type AsyncPadError,
} from "../../util/error-handler-util";
import type { AuthUser, LoginCredentials, SignupCredentials } from "./types";
import { StorageUtil } from "../../util/StorageUtil";

export const signupUser = createAsyncThunk<
  AuthUser,
  SignupCredentials,
  { rejectValue: AsyncPadError }
>("auth/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response = await AuthApi.signup(credentials);
    StorageUtil.saveAccessToken(response.accessToken);
    StorageUtil.saveRefreshToken(response.refreshToken);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthUser,
  LoginCredentials,
  { rejectValue: AsyncPadError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await AuthApi.login(credentials);
    StorageUtil.saveAccessToken(response.accessToken);
    StorageUtil.saveRefreshToken(response.refreshToken);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const refreshToken = createAsyncThunk<
  AuthUser,
  string,
  { rejectValue: AsyncPadError }
>("auth/refreshToken", async (token, { rejectWithValue }) => {
  try {
    const response = await AuthApi.refreshToken(token);
    StorageUtil.saveAccessToken(response.accessToken);
    StorageUtil.saveRefreshToken(response.refreshToken);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});
