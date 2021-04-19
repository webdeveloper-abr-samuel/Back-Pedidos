//Routes
const loginRouter = require('./auth/loginRouter');
const userRouter = require('./users/userRouter');
const statisticsDistributorRouter = require('./statistics/statisticsDistributorRouter');
const pedidosRouter = require('./pedidos/pedidosRouter');

module.exports = app => {
    app.use('/abrageo/login', loginRouter);
    app.use('/abrageo/users', userRouter);
    app.use('/abrageo/statistic/distributor', statisticsDistributorRouter);
    app.use('/abrageo/pedidos', pedidosRouter);
}