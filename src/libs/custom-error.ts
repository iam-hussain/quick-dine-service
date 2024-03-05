export class CustomError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class AuthenticationError extends Error {
  constructor(public code: string) {
    super(code);
  }
}
