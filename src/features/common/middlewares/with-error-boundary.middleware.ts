import { HttpStatusCode } from "../constants/common.constants";
import { RequestHandler } from "../types/api.types";
import { isHttpError } from "../utils/is-http-error.util";

export function withErrorBoundary(handler: RequestHandler): RequestHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
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
