import { RequestMiddleware } from "../types/api.types";
import { sleep } from "../utils/sleep.util";

export function withDelay(delay: number): RequestMiddleware {
  return (handler) => async (req, res) => {
    await sleep(delay);
    await handler(req, res);
  };
}
