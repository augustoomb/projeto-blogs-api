const blogPostServices = require('../services/blogPostServices');
const userServices = require('../services/userServices');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req; // veio do auth token

  // VALIDANDO OS DADOS INFORMADOS
  const checkPost = await blogPostServices.checkPostsInfo(title, content, categoryIds);
  if (checkPost.error) return next(checkPost.error);

  // DESCOBRINDO ID DO USUÁRIO LOGADO
  const { id } = await userServices.getIdByEmail(email); // ID USUÁRIO LOGADO
  return res.status(200).json({ id });
};

module.exports = { create };
