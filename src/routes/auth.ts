import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import { AuthInput, User } from '../models/User';

const authRouter = Router();
const userController = new UserController();

authRouter.post('/signup', async (req: Request, res: Response) => {
    const userRequest = req.body as User;
    try {
        const userCreated = await userController.signup(userRequest);
        res.json(userCreated);
    }
    catch (error) {
        console.log(error);
        res.send(500);
    }
});

authRouter.post('/signin', async (req: Request, res: Response) => {
    const auth = req.body as AuthInput;
    try {
        const resultAuth = await userController.signin(auth);
        res.json(resultAuth);
    }
    catch (err) {
        console.log(err);

        res.sendStatus(401);
    }
});

export default authRouter;