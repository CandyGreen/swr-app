export type BffSuccessResponse<TData> = {
  data: TData;
  metadata: Record<string, unknown>;
};

export type BffFailureResponse = {
  error: {
    message: string;
  };
  metadata: Record<string, unknown>;
};
