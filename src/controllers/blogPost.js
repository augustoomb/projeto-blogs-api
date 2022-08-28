const blogPostServices = require('../services/blogPostServices');
const userServices = require('../services/userServices');
const categoryServices = require('../services/categoryServices');
const postCategoryServices = require('../services/postCategoryServices');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req; // veio do auth token

  // VALIDANDO OS DADOS INFORMADOS
  const checkPost = await blogPostServices.checkPostsInfo(title, content, categoryIds);
  if (checkPost.error) return next(checkPost.error);

  // CHECANDO SE OS TODOS IDs DE CATEGORIA FORNECIDOS EXISTEM NO BANCO
  const allIdsInDb = await categoryServices.findAllId(categoryIds);
  if (allIdsInDb.error) return next(allIdsInDb.error);
  // return res.status(200).json(allIdsInDb);

  // DESCOBRINDO ID DO USUÁRIO LOGADO (não preciso checar(if). Se chegou aqui tem token válido)
  const { id } = await userServices.getIdByEmail(email); // ID USUÁRIO LOGADO

  // SALVAR NA TABLE blogposts title, content + userId QUE PEGUEI NO auth (middleware)
  const createdPost = await blogPostServices.create(title, content, id);
  if (createdPost.error) return next(createdPost.error);

  // USAR O postId GERADO NA ÚLTIMA AÇÃO + OS categoryIds(array) PASSADOS E INSERIR NA TABLE postCategories
  categoryIds.forEach(async (categoryId) => {
    const createdCategoryId = await postCategoryServices.createPostCategory(
      createdPost.id, categoryId,
    );
    console.log(createdCategoryId);
  });

  return res.status(201).json(createdPost);
};

const findAll = async (_req, res) => {
  const blogPosts = await blogPostServices.findAll();

  return res.status(200).json(blogPosts);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const blogPost = await blogPostServices.findById(id);
  if (blogPost.error) return next(blogPost.error);

  return res.status(200).json(blogPost);
};

const update = async (req, res, next) => {
  const { id } = req.params; // id do blogPost
  const { title, content } = req.body; // conteúdo do blogPost
  const { email } = req; // veio do auth token - é o email do usuário logado

  // VALIDANDO OS DADOS DE BLOGPOST INFORMADOS NO BODY
  const checkPost = await blogPostServices.checkPostUpdateInfo(title, content);
  if (checkPost.error) return next(checkPost.error);

  // VERIFICANDO SE O id DE blogPost PASSADO VIA PARAMS É VÁLIDO NO BANCO
  const postExists = await blogPostServices.findById(id);
  if (postExists.error) return next(postExists.error);

  // DESCOBRINDO ID DO USUÁRIO LOGADO (não preciso checar(if). Se chegou aqui tem token válido)
  const loggedUser = await userServices.getIdByEmail(email); // OBJ USUÁRIO LOGADO (loggedUser.id é o id)

  // CHECANDO SE O USUÁRIO CADASTRADO NO blogPost EM QUESTÃO É O MESMO USUÁRIO QUE ESTÁ LOGADO
  const userAuthorized = await blogPostServices.loggedUserIsAuthorized(loggedUser, postExists);
  if (userAuthorized.error) return next(userAuthorized.error);

  // ATUALIZANDO A TABELA blogPost
  const updatedPost = await blogPostServices.update(id, title, content);
  if (updatedPost.error) return next(updatedPost.error);

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params; // id do blogPost
  const { email } = req; // veio do auth token - é o email do usuário logado

  // VERIFICANDO SE O id DE blogPost PASSADO VIA PARAMS É VÁLIDO NO BANCO
  const postExists = await blogPostServices.findById(id);
  if (postExists.error) return next(postExists.error);

  // DESCOBRINDO ID DO USUÁRIO LOGADO
  const loggedUser = await userServices.getIdByEmail(email); // OBJ USUÁRIO LOGADO (loggedUser.id é o id)

  // CHECANDO SE O USUÁRIO CADASTRADO NO blogPost EM QUESTÃO É O MESMO USUÁRIO QUE ESTÁ LOGADO
  const userAuthorized = await blogPostServices.loggedUserIsAuthorized(loggedUser, postExists);
  if (userAuthorized.error) return next(userAuthorized.error);

  // APAGANDO O BLOGPOST
  const deletedPost = await blogPostServices.deletePost(id);
  if (deletedPost.error) return next(deletedPost.error); // erro caso o blogPost não seja encontrado no banco

  return res.status(204).end();
};

const searchByTerm = async (req, res, _next) => {
  const { q } = req.query;

  const blogPosts = await blogPostServices.searchByTerm(q);

  return res.status(200).json(blogPosts);
};

module.exports = { create, findAll, findById, update, deletePost, searchByTerm };

// PASSOS CREATE:

  // (FEITO) Lançar title e content passados no body + userId que peguei no auth, na table blogPost

  // (FEITO) Pegar o postId gerado na última ação

  // (FEITO) Pegar CADA CategoryId passado por param

  // (FEITO) lançar os 2 últimos passos na table postCategories

// -----------------

// PASSOS UPDATE:

  // (FEITO) Testar se title e content foram enviados (não estão em branco - joi)

  // (FEITO) Testar se id de blogPost passado é valido (checar se existe no banco)

  // (FEITO) Buscar através da autenticação (auth e token) qual usuário enviou

  // (FEITO) Pegar o usuário passado no passo 3 e comparar se ele é dono do blogPost que está no banco

  // (FEITO) Atualizar title e content na tabela blogPosts
