const { User } = require('../database/models');
const userValidations = require('../helpers/userValidations');

const { schemaLoginEmail, schemaLoginPassword, schemaDisplayNameRegister, schemaEmailRegister,
  schemaPasswordRegister } = userValidations;

const jwtTokenHelpers = require('../helpers/jwtTokenHelpers');

const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

const userLoginIsValid = async (email, password) => {
  const checkedEmail = schemaLoginEmail.validate({ email });
  const checkedpass = schemaLoginPassword.validate({ password });

  if (checkedEmail.error || checkedpass.error) {
    return mountObjError(400, 'Some required fields are missing');
  }

  const result = await User.findOne({ where: { email } });

  if (!result || result.dataValues.password !== password) {
    return mountObjError(400, 'Invalid fields');
  }

  return result;
};

const login = async (email) => {
  const token = jwtTokenHelpers.createToken({ email });

  return token;
};

const userRegisterIsValid = async (displayName, email, password) => {
  const checkedDisplayName = schemaDisplayNameRegister.validate({ displayName });
  if (checkedDisplayName.error) {
    return mountObjError(400, '"displayName" length must be at least 8 characters long');
  }

  const checkedEmail = schemaEmailRegister.validate({ email });
  if (checkedEmail.error) {
    return mountObjError(400, '"email" must be a valid email');
  }

  const checkedPass = schemaPasswordRegister.validate({ password });
  if (checkedPass.error) {
    return mountObjError(400, '"password" length must be at least 6 characters long');
  }

  return true;
};

const register = async (displayName, email, password, image) => {
  // CHECANDO SE O USUÁRIO JÁ EXISTE NO BANCO
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return mountObjError(409, 'User already registered');
  }

  // CRIANDO USUÁRIO NO BANCO
  const result = await User.create({ displayName, email, password, image });
  if (!result) {
    return mountObjError(500, 'Não foi possível criar usuário');
  }

  // RETORNANDO TRUE APENAS PARA MARCAR QUE NÃO HÁ ERRO
  return true;
};

module.exports = { userLoginIsValid, login, userRegisterIsValid, register };