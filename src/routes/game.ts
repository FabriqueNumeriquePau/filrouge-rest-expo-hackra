import { Request, Response, Router } from 'express';
import GameController from '../controllers/GameController';
import { Game } from '../models/Game';
import { ApiError } from '../utils/http.util';

const gameRouter = Router();
const gameController = new GameController();

gameRouter.get('/', async (req: Request, res: Response) => {
    try {
        const games = await gameController.find();
        res.json(games);
    }
    catch (error) {
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
    }
});

gameRouter.post('/', (req: Request, res: Response) => {
    // try {
    //     const model = new GameModel(req.body);
    //     model.save();
    //     res.status(200).json(model);
    // }
    // catch (error) {
    //     if (error instanceof ApiError) {
    //         res.status(error.code).json(error);
    //     }
    //     res.status(500).send(error.toString());
    // }
});

export default gameRouter;