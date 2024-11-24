type HttpErrorOptions = {
  status: number;
  code?: string;
};

export class HttpError extends Error {
  status: number;
  code?: string;

  constructor(message: string, options: HttpErrorOptions) {
    super(message);

    this.name = "HttpError";
    this.status = options.status;

    if (options.code) {
      this.code = options.code;
    }
  }
}
