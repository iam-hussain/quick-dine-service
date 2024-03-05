export class CustomError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export class AuthenticationError extends Error {
  constructor(public code: string) {
    super(code);
  }
}
