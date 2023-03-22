const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  validation: (rules) => (req, res, next) => {
    const validationSchema = Joi.object(rules);
    const validationResult = validationSchema.validate(req.body);
    if (validationResult.error) { next(new ValidationError(validationResult.error.details[0].message));}
    next();
  },

  register: {
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string(),
    token: Joi.string(),
  },

  login: {
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  },

  add: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.bool().required(),
    },

  updateContact: {
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.bool(),
    },

  updateFavorite: {
      favorite: Joi.bool()
        .required()
        .messages({ "any.required": "Missing field favorite" }),
    },
};
