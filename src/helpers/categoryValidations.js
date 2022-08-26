const Joi = require('joi');

// VALIDAÇÕES DE CADASTRO DE CATEGORIAS
const schemaName = Joi.object({
  name: Joi.string()
    .required(),  
});

module.exports = { schemaName };
