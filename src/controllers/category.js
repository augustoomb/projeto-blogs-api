const categoryService = require('../services/categoryServices');

const create = async (req, res, next) => {
  const { name } = req.body;

  // CHAMANDO O SERVICE PARA CADASTRAR CATEGORIA
  const categoryCreated = await categoryService.createCategory(name);
  if (categoryCreated.error) return next(categoryCreated.error);

  return res.status(201).json(categoryCreated);
};

const findAll = async (_req, res) => {
  const categories = await categoryService.findAll();

  console.log(categories);

  return res.status(200).json(categories);
};

module.exports = { create, findAll };
