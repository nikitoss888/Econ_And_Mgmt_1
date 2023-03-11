const { Router } = require('express');
const mainRouter = Router();

const userRouter = require('./UserRoutes');
const briefRouter = require('./BriefRoutes');

mainRouter.use('/user', userRouter);
mainRouter.use('/brief', briefRouter);

module.exports = mainRouter;