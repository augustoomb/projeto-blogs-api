const express = require('express');

const userController = require('./controllers/user');
const categoryController = require('./controllers/category');

const errorMiddleware = require('./middlewares/error');

const authValidation = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.register);
app.get('/user', authValidation.auth, userController.findAll);
app.get('/user/:id', authValidation.auth, userController.findByPk);

app.post('/categories', authValidation.auth, categoryController.create);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

// ficará responsável por receber as definições de middlewares e rotas de sua API