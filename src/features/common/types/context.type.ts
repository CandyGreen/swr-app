import { Auth } from "./auth.type";
import { Logger } from "./logger.type";

export type Context = {
  auth: Auth;
  logger: Logger;
};
