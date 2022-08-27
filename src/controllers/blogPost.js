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

  // DESCOBRINDO ID DO USUÁRIO LOGADO (não preciso checar. Se chegou aqui tem token válido)
  const { id } = await userServices.getIdByEmail(email); // ID USUÁRIO LOGADO

  // SALVAR NA TABLE blogposts title, content + userId QUE PEGUEI NO auth (middleware)
  const createdPost = await blogPostServices.create(title, content, id);
  if (createdPost.error) return next(createdPost.error);

  // USAR O postId GERADO NA ÚLTIMA AÇÃO + OS categoryIds PASSADOS E INSERIR NA TABLE postCategories
  categoryIds.forEach(async (categoryId) => {
    const createdCategoryId = await postCategoryServices.createPostCategory(
      createdPost.id, categoryId,
    );
    console.log(createdCategoryId);
  });

  return res.status(201).json(createdPost);
};

module.exports = { create };

// (FEITO) Lançar title e content passados no body + userId que peguei no auth, na table blogPost

// (FEITO) Pegar o postId gerado na ultima ação

// (FEITO) Pegar CADA CategoryId passado por param

// lançar os 2 últimos passos na table postCategories
