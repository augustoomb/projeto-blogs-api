const { Op } = require('sequelize');
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

const findAll = async () => {
  const result = await Category.findAll();

  // const categories = result.map((category) => category.dataValues);

  return result;
};

// SIMILAR AO findAll, MAS BUSCA APENAS ELEMENTOS QUE TENHAM ID IGUAL A UM DOS ITENS DO ARR categoryIds
const findAllId = async (categoryIds) => {
  const result = await Category.findAll({
    where: {
      id: {
        [Op.or]: categoryIds,
      },
    },
  });
  
  const todosOsIdsExistemNoBanco = result.length === categoryIds.length; // true é sim, false é não

  if (!todosOsIdsExistemNoBanco) {
    return mountObjError(400, '"categoryIds" not found');
  }

  return true;
};

module.exports = { createCategory, findAll, findAllId };

// EXPLICANDO A FUNÇÃO findAllId:

/*
Recebo um arr de Ids de categoria como parâmetro
Dentro do where, verifico se cada id passado existe no banco
[Op.or]: O 'or' aqui no caso serve para que qualquer item do arr que 'dê um match' com um id do banco
seja trazido

Por fim, verifico se o tamanho do array de categorias que veio do banco
é do mesmo tamanho do arr que foi passado. 
Se for, significa que todas os ids passados batem com os arrays do banco
Então, nenhum id inválido foi fornecido.

FONTES: 
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall
https://stackoverflow.com/questions/47537419/how-to-search-for-array-with-multiple-search-values-in-postgresql-using-sequeliz
*/
