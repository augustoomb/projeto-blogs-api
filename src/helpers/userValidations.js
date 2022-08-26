const Joi = require('joi');

// VALIDAÇÕES DE LOGIN
const schemaLoginEmail = Joi.object({
  email: Joi.string()
    .required(),  
});

const schemaLoginPassword = Joi.object({
  password: Joi.string()
    .required(),  
});

// VALIDAÇÕES DE REGISTRO DE USUÁRIO
const schemaDisplayNameRegister = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required(),  
});

const schemaEmailRegister = Joi.object({
  email: Joi.string()
    .email(),
});

const schemaPasswordRegister = Joi.object({
  password: Joi.string()
    .min(6)
    .required(),  
});

module.exports = {
  schemaLoginEmail,
  schemaLoginPassword,
  schemaDisplayNameRegister,
  schemaEmailRegister,
  schemaPasswordRegister,
};