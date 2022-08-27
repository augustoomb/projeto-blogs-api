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

// CHECAR SE POST INFORMADO É VALIDO (NÃO NULO/VAZIO) ANTES DE EFETUAR UM 'CREATE'
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

// CHECAR SE POST INFORMADO É VALIDO (NÃO NULO/VAZIO) ANTES DE EFETUAR UM 'UPDATE'
const checkPostUpdateInfo = (title, content) => {
  const checkTitle = schemaTitle.validate({ title });
  const checkContent = schemaContent.validate({ content });

  if (checkTitle.error || checkContent.error) {
    return mountObjError(400, 'Some required fields are missing');
  }

  return true;
};

// APENAS CHECANDO SE O USUÁRIO CADASTRADO NO POST É O MESMO USUÁRIO QUE ESTÁ LOGADO
const loggedUserIsAuthorized = (loggedUser, post) => {
  const checkUser = loggedUser.id === post.userId;

  if (!checkUser) {
    return mountObjError(401, 'Unauthorized user');
  }

  return true;
};

// ATUALIZA O CONTEÚDO DE UM BLOGPOST ESPECÍFICO, PASSADO NO PARAM id
const update = async (id, title, content) => {
  const result = await BlogPost.update(
    { title, content },
    { where: { id } },
    { include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }] },
  );

  // RESULT IGUAL A UMA ARRAY COM UM UNICO ELEMENTO IGUAL A 0, SIGNIFICA QUE NÃO ATUALIZOU
  if (result[0] === 0 || !result) {
    return mountObjError(404, 'Erro ao atualizar o post!');
  }

  // RESULT IGUAL A UMA ARRAY COM UM UNICO ELEMENTO IGUAL A 1, SIGNIFICA QUE ATUALIZOU
  // SE CHEGOU ATÉ AQUI, ATUALIZOU COM SUCESSO, MAS NÃO TENHO MAIS O OBJ blogPost EM MÃOS.
  // SÓ BUSCAR NO BANCO NOVAMENTE E RETORNAR ELE
  const updatedBlogPost = await findById(id);
  return updatedBlogPost;
};

module.exports = {
  checkPostsInfo,
  create,
  findAll,
  findById,
  update,
  checkPostUpdateInfo,
  loggedUserIsAuthorized,
};
