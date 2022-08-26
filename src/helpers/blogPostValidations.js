const Joi = require('joi');

const schemaTitle = Joi.object({
  title: Joi.string()
    .required(),  
});

const schemaContent = Joi.object({
  content: Joi.string()
    .required(),  
});

const schemaCategoryIds = Joi.object({
  categoryIds: Joi.array()
    .required(),  
});

module.exports = {
  schemaTitle, schemaContent, schemaCategoryIds,
};