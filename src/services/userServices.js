const { User } = require('../database/models');

// const jwtTokenHelpers = require('../helpers/jwtTokenHelpers');

const login = async (email, _password) => {
  let result = '';

  try {
    result = await User.findOne({ 
      where: { email },
  });
  } catch (error) {
    console.log(error);
  }

  return result;
};

module.exports = { login };
