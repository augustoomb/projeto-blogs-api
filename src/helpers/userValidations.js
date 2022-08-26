const Joi = require('joi');

const schemaEmail = Joi.object({
  email: Joi.string()
    .required(),  
});

const schemaPassword = Joi.object({
  password: Joi.string()
    .required(),  
});

module.exports = {
  schemaEmail, schemaPassword,
};