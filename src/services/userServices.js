const { User } = require('../database/models');
const userValidations = require('../helpers/userValidations');

const { schemaLoginEmail, schemaLoginPassword, schemaDisplayNameRegister, schemaEmailRegister,
  schemaPasswordRegister } = userValidations;

const jwtTokenHelpers = require('../helpers/jwtTokenHelpers');

// USO INTERNO
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

const findAll = async () => {
  const result = await User.findAll(
    { attributes: { exclude: ['password'] } },
  );

  // RESULT ENTREGA UM ARR DE OBJ COM MUITA INFORMAÇÃO. AQUI TIRO SÓ O QUE ME INTERESSA
  // EM OUTRAS CHAMADAS NÃO PRECISEI FAZER ISSO, SÓ AQUI. VERIFICAR PQ!
  const users = result.map((user) => user.dataValues);

  return users;
};

const findByPk = async (id) => {
  const result = await User.findAll(
    { attributes: { exclude: ['password'] }, where: { id } },
  );

  if (result.length === 0) {
    return mountObjError(404, 'User does not exist');
  }

  return result[0];
};

// AO INFORMAR O E-MAIL, RECEBER O ID DO USUÁRIO
const getIdByEmail = (email) => {
  const user = User.findOne({ where: { email } });
  return user;
};

// DELETE O USUÁRIO INFORMADO
const deleteUser = async (email) => {
  const result = await User.destroy(
    { where: { email } },
  );

  if (result === 0) {
    return mountObjError(404, 'User does not exist');
  }

  return result; // se delete ocorreu normalmente, resposta será 1
};

module.exports = { userLoginIsValid,
  login,
  userRegisterIsValid,
  register,
  findAll,
  findByPk,
  getIdByEmail,
  deleteUser,
};
