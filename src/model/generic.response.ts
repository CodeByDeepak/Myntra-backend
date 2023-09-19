export class GenericResponse {
  statusCode: number;
  message: string;
  error: string;
  results: any;

  constructor(
    statusCode: number,
    message: string,
    error: string,
    results: any,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.results = results;
  }
}
