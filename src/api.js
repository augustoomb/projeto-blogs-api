const express = require('express');

const userController = require('./controllers/user');

const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.register);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

// ficará responsável por receber as definições de middlewares e rotas de sua API