const userService = require('../services/userServices');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const checkUser = await userService.userIsValid(email, password);
  if (checkUser.error) return next(checkUser.error);

  const token = await userService.login(email, password);

  return res.status(200).json({ token });
};

module.exports = { login };
