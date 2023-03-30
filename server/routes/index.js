const { Router } = require('express');
const mainRouter = Router();

const userRouter = require('./UserRoutes');
const briefRouter = require('./BriefRoutes');

mainRouter.use('/user', userRouter);
mainRouter.use('/brief', briefRouter);
mainRouter.use('/ping', (req, res) => {
    return res.status(200).json({message: 'pong'});
});

module.exports = mainRouter;