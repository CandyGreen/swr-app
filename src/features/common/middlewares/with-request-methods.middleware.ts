import { CommonApiErrorCode } from "../constants/common-api-error-code.constants";
import { HttpMethod, HttpStatusCode } from "../constants/common.constants";
import { RequestMiddleware } from "../types/api.types";
import { HttpError } from "../utils/http-error.util";

export function withRequestMethods(methods: HttpMethod[]): RequestMiddleware {
  return (handler) => async (req, res) => {
    res.setHeader("Access-Control-Allow-Methods", methods.join(", "));

    const method = methods.find((method) => req.method === method);

    if (!method) {
      throw new HttpError(`Only ${methods.join(", ")} method(s) are allowed`, {
        status: HttpStatusCode.METHOD_NOT_ALLOWED,
        code: CommonApiErrorCode.METHOD_NOT_ALLOWED,
      });
    }

    await handler(req, res);
  };
}
