const { Category } = require('../database/models');

const categoryValidations = require('../helpers/categoryValidations');

const { schemaName } = categoryValidations;

// USO INTERNO
const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

const createCategory = async (name) => {
  // VALIDANDO INFORMAÇÕES ANTES DE CRIAR NOVA CATEGORIA
  const checkedNameCategory = schemaName.validate({ name });
  if (checkedNameCategory.error) {
    return mountObjError(400, '"name" is required');
  }

  const result = await Category.create({ name });
  if (!result) {
    return mountObjError(500, 'Não foi possível criar categoria');
  }

  return result;
};

module.exports = { createCategory };
