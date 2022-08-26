const { User } = require('../database/models');
const userValidations = require('../helpers/userValidations');

const { schemaEmail, schemaPassword } = userValidations;

const jwtTokenHelpers = require('../helpers/jwtTokenHelpers');

const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

const userIsValid = async (email, password) => {
  const checkedEmail = schemaEmail.validate({ email });
  const checkedpass = schemaPassword.validate({ password });

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

module.exports = { userIsValid, login };
