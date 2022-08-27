const { BlogPost, User, Category } = require('../database/models');

const blogPostValidations = require('../helpers/blogPostValidations');

const { schemaTitle, schemaContent, schemaCategoryIds } = blogPostValidations;

// USO INTERNO
const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

// CHECAR SE POST INFORMADO É VALIDO (NÃO NULO/VAZIO)
const checkPostsInfo = (title, content, categoryIds) => {
  const checkTitle = schemaTitle.validate({ title });
  const checkContent = schemaContent.validate({ content });
  const checkCategoryIds = schemaCategoryIds.validate({ categoryIds });

  if (checkTitle.error || checkContent.error || checkCategoryIds.error) {
    return mountObjError(400, 'Some required fields are missing');
  }

  return true;
};

const create = async (title, content, userId) => {
  const published = new Date();
  const updated = new Date();
  const result = await BlogPost.create({ title, content, userId, published, updated });

  if (!result) {
    return mountObjError(500, 'Não foi possível criar blogPost');
  }

  return result;
};

const findAll = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return result;
};

const findById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!result) {
    return mountObjError(404, 'Post does not exist');
  }

  return result;
};

module.exports = { checkPostsInfo, create, findAll, findById };
