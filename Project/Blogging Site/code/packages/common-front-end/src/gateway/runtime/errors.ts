/** Thrown when the API answers with a non-2xx status. */
export class ApiError<TBody = unknown> extends Error {
  readonly name = 'ApiError';

  constructor(
    readonly status: number,
    readonly statusText: string,
    readonly method: string,
    readonly url: string,
    readonly body: TBody,
  ) {
    super(`${method} ${url} failed with ${status} ${statusText}`.trim());
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/** Thrown before any network call when the request is invalid. */
export class RequestValidationError extends Error {
  readonly name = 'RequestValidationError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
