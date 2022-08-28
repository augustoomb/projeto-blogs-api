const express = require('express');

const userController = require('./controllers/user');
const categoryController = require('./controllers/category');
const blogPostController = require('./controllers/blogPost');

const errorMiddleware = require('./middlewares/error');

const authValidation = require('./middlewares/auth');

const app = express();

app.use(express.json());

// ROTAS: USERS
app.post('/login', userController.login);
app.post('/user', userController.register);
app.get('/user', authValidation.auth, userController.findAll);
app.get('/user/:id', authValidation.auth, userController.findByPk);
app.delete('/user/me', authValidation.auth, userController.deleteUser); // deleta meu usuário

// ROTAS: CATEGORIES
app.post('/categories', authValidation.auth, categoryController.create);
app.get('/categories', authValidation.auth, categoryController.findAll);

// ROTAS: BLOGPOST 
app.get('/post/search', authValidation.auth, blogPostController.searchByTerm); // busca por termo
app.post('/post', authValidation.auth, blogPostController.create);
app.get('/post', authValidation.auth, blogPostController.findAll);
app.get('/post/:id', authValidation.auth, blogPostController.findById);
app.put('/post/:id', authValidation.auth, blogPostController.update);
app.delete('/post/:id', authValidation.auth, blogPostController.deletePost);

// ERROS RETORNADOS COM next(argumento) DENTRO DOS CONTROLLERS VEM DIRETO PRA CÁ ...
app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

// ficará responsável por receber as definições de middlewares e rotas de sua API