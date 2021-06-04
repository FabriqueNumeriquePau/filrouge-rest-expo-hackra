import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import { AuthInput, User } from '../models/User';
import { ApiError } from '../utils/http.util';

const authRouter = Router();
const userController = new UserController();

authRouter.post('/signup', async (req: Request, res: Response) => {
    const userRequest = req.body as User;
    try {
        const userCreated = await userController.signup(userRequest);
        res.json(userCreated);
    }
    catch (error) {
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
    }
});

authRouter.post('/signin', async (req: Request, res: Response) => {
    const auth = req.body as AuthInput;
    try {
        const resultAuth = await userController.signin(auth);
        res.json(resultAuth);
    }
    catch (error) {
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
    }
});

export default authRouter;