const userService = require('../services/userServices');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'ERROR_500' }); 
  }   
};

module.exports = { login };
