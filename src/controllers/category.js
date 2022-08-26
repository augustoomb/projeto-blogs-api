const categoryService = require('../services/categoryServices');

const create = async (req, res, next) => {
  const { name } = req.body;

  // CHAMANDO O SERVICE PARA CADASTRAR CATEGORIA
  const categoryCreated = await categoryService.createCategory(name);
  if (categoryCreated.error) return next(categoryCreated.error);

  return res.status(201).json(categoryCreated);
};

module.exports = { create };
