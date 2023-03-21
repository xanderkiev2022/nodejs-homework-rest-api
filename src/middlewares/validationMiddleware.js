const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    const contactValidation = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.bool().required(),
    });

    const validationResult = contactValidation.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
    const contactValidation = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.bool(),
    });

    const validationResult = contactValidation.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  updateFavoriteValidation: (req, res, next) => {
    const favoriteValidation = Joi.object({
      favorite: Joi.bool()
        .required()
        .messages({ "any.required": "Missing field favorite" }),
    });
    const validationResult = favoriteValidation.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  registerValidation: (req, res, next) => {
    const userValidation = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });

    const validationResult = userValidation.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  loginValidation: (req, res, next) => {
    const userValidation = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    const validationResult = userValidation.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
};
