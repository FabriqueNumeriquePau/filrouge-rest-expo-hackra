import { Router } from 'express';
import { Game, GameModel } from '../models/Game';

const gameRouter = Router();

gameRouter.get('/', async (req, res) => {
    try {
        const games = await GameModel.find();
        res.json(games);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

gameRouter.post('/', (req, res) => {
    try {
        const model = new GameModel(req.body);
        model.save();
        res.status(200).json(model);
    }
    catch(error) {
        res.status(500).json(error);
    }
});

export default gameRouter;