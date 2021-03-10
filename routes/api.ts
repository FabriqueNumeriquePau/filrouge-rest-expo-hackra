import { Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';
import playerRouter from './player';
import teamRouter from './team';

const apiRouter = Router();

apiRouter.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]: ${req.method} -> ${req.url}`);
    next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/game', gameRouter);
apiRouter.use('/team', teamRouter);
apiRouter.use('/player', playerRouter);

export default apiRouter;