const { NotFoundError, ValidationError, UnauthorizedError } = require("./errors");

const asyncWrapper = (controller) => {
    return (req, res, next) => {
        controller(req, res).catch(next)
    };
};

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError || err instanceof NotFoundError || err instanceof UnauthorizedError) {
      return res.status(err.status).json({ message: err.message });
    }
  res.status(500).json({ message: err.message })
}

module.exports = { asyncWrapper, errorHandler };