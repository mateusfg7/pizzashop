export class NotFoundError extends Error {
  constructor(public message = 'Not Found.') {
    super(message)
  }
}
