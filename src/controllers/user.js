const userService = require('../services/userServices');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const checkUser = await userService.userLoginIsValid(email, password);
  if (checkUser.error) return next(checkUser.error);

  const token = await userService.login(email);

  return res.status(200).json({ token });
};

const register = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  // VALIDANDO DADOS INFORMADOS
  const checkUser = await userService.userRegisterIsValid(displayName, email, password);
  if (checkUser.error) return next(checkUser.error);

  // CADASTRANDO USUÁRIO
  const userRegistred = await userService.register(displayName, email, password, image);
  if (userRegistred.error) return next(userRegistred.error);

  // COMO NÃO HÁ ERRO, GERO O TOKEN DO EMAIL CADASTRADO
  const token = await userService.login(email);

  return res.status(201).json({ token });
};

const findAll = async (_req, res) => {
  const users = await userService.findAll();

  return res.status(200).json(users);
};

const findByPk = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findByPk(id);
  if (user.error) return next(user.error);

  return res.status(200).json(user);
};

const deleteUser = async (req, res, next) => {
  const { email } = req; // veio do auth token

  const userDeleted = await userService.deleteUser(email);
  if (userDeleted.error) return next(userDeleted.error);

  return res.status(204).end();
};

module.exports = { login, register, findAll, findByPk, deleteUser };
