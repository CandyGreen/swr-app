import { RequestHandler, RequestMiddleware } from "../types/api.types";

export function applyMiddlewares(handler: RequestHandler, middlewares: RequestMiddleware[]) {
  return middlewares.reduceRight((fn, middleware) => middleware(fn), handler);
}
