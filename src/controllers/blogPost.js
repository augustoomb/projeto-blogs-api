const blogPostServices = require('../services/blogPostServices');
const userServices = require('../services/userServices');
const categoryServices = require('../services/categoryServices');

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

  // DESCOBRINDO ID DO USUÁRIO LOGADO (não preciso checar. Se chegou aqui tem token valido)
  const { id } = await userServices.getIdByEmail(email); // ID USUÁRIO LOGADO
};

module.exports = { create };
