import type { AxiosError } from "axios";
import axiosInstance from "../config";
import { CustomError } from "../../../error/custom-error";
import { ErrorType } from "../../../error/error-type";

export async function getRequest<T>(endpoint: string) {
  try {
    const response = await axiosInstance.post(`${endpoint}`, {
      method: "GET",
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
