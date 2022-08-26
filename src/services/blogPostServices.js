// const { BlogPost } = require('../database/models');

const blogPostValidations = require('../helpers/blogPostValidations');

const { schemaTitle, schemaContent, schemaCategoryIds } = blogPostValidations;

// USO INTERNO
const mountObjError = (statusCode, messageStr) => ({  
  error: {
    status: statusCode,
    message: messageStr,
  },  
});

// CHECAR SE POST INFORMADO É VALIDO (NÃO NULO/VAZIO)
const checkPostsInfo = (title, content, categoryIds) => {
  const checkTitle = schemaTitle.validate({ title });
  const checkContent = schemaContent.validate({ content });
  const checkCategoryIds = schemaCategoryIds.validate({ categoryIds });

  if (checkTitle.error || checkContent.error || checkCategoryIds.error) {
    return mountObjError(400, 'Some required fields are missing');
  }

  return true;
};

// // AO INFORMAR O E-MAIL, RECEBER O ID DO USUÁRIO
// const getIdByEmail = (email) => {
//   const user = User.findOne({ where: { email } });
//   return user;
// };

module.exports = { checkPostsInfo };
