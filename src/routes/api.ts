import { NextFunction, Request, Response, Router } from 'express';
import authRouter from './auth';
import gameRouter from './game';

const apiRouter = Router();

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}]: ${req.method} -> ${req.url}`);
    next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/game', gameRouter);

export default apiRouter;