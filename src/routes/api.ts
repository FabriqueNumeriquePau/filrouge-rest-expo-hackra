import { NextFunction, Request, Response, Router } from 'express';
import checkJwt from '../middlewares/jwt';
import { adminRole } from '../middlewares/roles';
import authRouter from './auth';
import gameRouter from './game';
import playerRouter from './player';
import teamRouter from './team';
import swaggerUi from 'swagger-ui-express';

const apiRouter = Router();
apiRouter.use('/doc', swaggerUi.serve);

apiRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log('err');

    }
});

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}]: ${req.method} -> ${req.url}`);
    next();
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/game', checkJwt, adminRole, gameRouter);
apiRouter.use('/team', checkJwt, adminRole, teamRouter);
apiRouter.use('/player', checkJwt, adminRole, playerRouter);

export default apiRouter;