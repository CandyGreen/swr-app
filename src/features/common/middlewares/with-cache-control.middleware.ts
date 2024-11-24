import { CacheControl } from "../constants/common.constants";
import { RequestMiddleware } from "../types/api.types";

export function withCacheControl(cacheControl: CacheControl): RequestMiddleware {
  return (handler) => async (req, res) => {
    res.setHeader("Cache-Control", cacheControl);

    await handler(req, res);
  };
}
