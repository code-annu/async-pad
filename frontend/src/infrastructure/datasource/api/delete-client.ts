import { CustomError } from "../../../error/custom-error";
import { ErrorType } from "../../../error/error-type";
import { API_BASE_URL } from "../config";
import axios, { AxiosError } from "axios";

export async function deleteRequest<T>(
  endpoint: string,
  body?: unknown,
  token?: string
) {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`,  {
      method: "DELETE",
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
