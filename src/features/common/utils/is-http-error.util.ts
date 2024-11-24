import { HttpError } from "./http-error.util";

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
