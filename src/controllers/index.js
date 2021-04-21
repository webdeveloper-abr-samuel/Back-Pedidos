//Controllers
const loginController = require('./auth/loginController');
const userController = require('./userController');
const statisticsDistributorController = require('./statisticsDistributorController');
const pedidosController = require('./pedidosController');
const messagesEmailController = require('./messagesEmailController');

module.exports = {
    loginController,
    userController,
    statisticsDistributorController,
    pedidosController,
    messagesEmailController
}