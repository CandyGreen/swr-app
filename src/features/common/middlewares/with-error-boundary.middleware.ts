import { fromZodError, isZodErrorLike } from "zod-validation-error";

import { HttpStatusCode } from "../constants/common.constants";
import { RequestHandler } from "../types/api.types";
import { isHttpError } from "../utils/is-http-error.util";

export function withErrorBoundary(handler: RequestHandler): RequestHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (isZodErrorLike(error)) {
        const message = fromZodError(error, {
          prefix: null,
        }).toString();

        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
          error: {
            message,
            // TODO: Move to enum
            code: "INVALID_DATA",
          },
          metadata: {},
        });
      }

      if (isHttpError(error)) {
        return res.status(error.status).json({
          error: {
            message: error.message,
            code: error.code,
          },
          metadata: {},
        });
      }

      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: {
          message: error instanceof Error ? error.message : "Something went wrong",
        },
        metadata: {},
      });
    }
  };
}
