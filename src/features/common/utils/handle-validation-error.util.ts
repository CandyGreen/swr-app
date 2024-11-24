import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { HttpStatusCode } from "../constants/common.constants";
import { HttpError } from "./http-error.util";

type HandleValidationErrorOptions = {
  code: string;
  status?: HttpStatusCode;
};

export function handleValidationError(
  error: unknown,
  { code, status = HttpStatusCode.UNPROCESSABLE_ENTITY }: HandleValidationErrorOptions,
): never {
  if (isZodErrorLike(error)) {
    const message = fromZodError(error, { prefix: null }).toString();

    throw new HttpError(message, { status, code });
  }

  throw error;
}
