const { PostCategory } = require('../database/models');

// USO INTERNO
const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

const createPostCategory = async (postId, categoryId) => {
  const result = await PostCategory.create({ postId, categoryId });
  if (!result) {
    return mountObjError(500, 'Não foi possível criar PostCategory');
  }

  return result;
};

module.exports = { createPostCategory };
