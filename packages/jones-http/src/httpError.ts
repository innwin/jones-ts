export class HttpRequestError extends Error {
  statusCode?: number;
  problemDetails?: ProblemDetails;

  constructor(statusCode: number, problemDetails?: ProblemDetails) {
    super();
    this.statusCode = statusCode;
    this.problemDetails = problemDetails;

    Object.setPrototypeOf(this, HttpRequestError.prototype);
  }
}

export class HttpUnauthorizedError extends HttpRequestError {

  constructor(problemDetails?: ProblemDetails) {
    super(401, problemDetails);

    Object.setPrototypeOf(this, HttpUnauthorizedError.prototype);
  }
}

export interface ProblemDetails {
  status: number,
  title: string,
  detail: string
}
