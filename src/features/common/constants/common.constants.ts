export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  METHOD_NOT_ALLOWED = 405,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Currency {
  USD = "usd",
}

export enum AppLocale {
  EN = "en",
  FR = "fr",
}

export enum CacheControl {
  NO_CACHE = "no-cache",
}
