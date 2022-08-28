const { Op } = require('sequelize');

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

// DELETA blogPost ESPECÍFICO ATRÁVES DO id INFORMADO
const deletePost = async (id) => {
  const result = await BlogPost.destroy(
    { where: { id } },
  );

  if (result === 0) {
    return mountObjError(404, 'Post does not exist');
  }

  return result; // se delete ocorreu normalmente, resposta será 1
};

// BUSCAR blogPost (title ou content) POR UM TERMO ESPECÍFICO INFORMADO
const searchByTerm = async (term) => {
  const result = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    }, { model: Category, as: 'categories', through: { attributes: [] } }],
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
  });

  return result;
};

module.exports = {
  checkPostsInfo,
  create,
  findAll,
  findById,
  update,
  checkPostUpdateInfo,
  loggedUserIsAuthorized,
  deletePost,
  searchByTerm,
};

// EXPLICANDO O searchByTerm

/*

dentro do findAll, dentro do include, incluo os dois relacionamentos para que no retorno eu tenha
os dados completos, com informações de todas as tabelas.

dentro do where, uso Op.or para especificar que quando qualquer uma das situações descritas dentro do 
arr for atendida, dar um match e trazer o resultado para mim. O 'or' especificamente tem a função de OU
usado normalmente. Poderia usar AND por ex, para exigir que ambas as condições do arr fossem cumpridas.

Dentro do arr, criei 2 condições de busca:

  1ª) a coluna title da tabela blogPosts, deve conter o termo passado via parametro.
  O like igual do sql é usado para definir que quero esse termo.
  Usei também o % antes e depois do termo, para especificar que pode haver palavras/trechos antes
    e depois do termo buscado.

  2ª) igual a primeira condição, mas buscando na coluna content.

FONTES: 
https://stackoverflow.com/questions/31258158/how-to-implement-search-feature-using-sequelizejs
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
*/