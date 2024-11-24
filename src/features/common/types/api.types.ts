import { NextApiRequest, NextApiResponse } from "next";

export type BffSuccessResponse<TData> = {
  data: TData;
  metadata: Record<string, unknown>;
};

export type BffFailureResponse = {
  error: {
    message: string;
    code?: string;
  };
  metadata: Record<string, unknown>;
};

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export type RequestMiddleware = (handler: RequestHandler) => RequestHandler;
