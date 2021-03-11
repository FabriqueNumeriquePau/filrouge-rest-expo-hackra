import { Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';

const apiRouter = Router();

apiRouter.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]: ${req.method} -> ${req.url}`);
    next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/game', gameRouter);

export default apiRouter;