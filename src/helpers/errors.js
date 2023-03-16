class ValidationError extends Error { 
constructor(message) {
    super(message);
    this.status = 400;
    }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
//     ResponseBody: {
//   "message": "Email or password is wrong"
// }
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
};