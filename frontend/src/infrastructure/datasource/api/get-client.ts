import type { AxiosError } from "axios";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { CustomError } from "../../../error/custom-error";
import { ErrorType } from "../../../error/error-type";

export async function getRequest<T>(endpoint: string, token?: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as T;
  } catch (e) {
    const axiosError = e as AxiosError;
    switch (axiosError.status) {
      case ErrorType.FORBIDDEN:
        throw new CustomError(
          "You are not authorized to access the resource",
          ErrorType.FORBIDDEN
        );
      case ErrorType.NOT_FOUND:
        throw new CustomError("Resource not found!", ErrorType.NOT_FOUND);
      case ErrorType.UNAUTHENTICATED:
        throw new CustomError(
          "You are not authenticated",
          ErrorType.UNAUTHENTICATED
        );
      default:
        throw new CustomError("Bad request", ErrorType.BAD_REQUEST);
    }
  }
}
