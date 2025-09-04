import { CustomError } from "../../../error/custom-error";
import { ErrorType } from "../../../error/error-type";
import axiosInstance, { API_BASE_URL } from "../config";
import { AxiosError } from "axios";

export async function patchRequest<T>(endpoint: string, body?: unknown) {
  try {
    const response = await axiosInstance.patch(
      `${API_BASE_URL}${endpoint}`,
      body,
      { method: "PATCH" }
    );
    return response.data as T;
  } catch (e) {
    const axiosError = e as AxiosError;
    console.log("error from api: ", axiosError.response?.data);
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
