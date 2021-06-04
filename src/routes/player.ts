import { Request, Response, Router } from 'express';
import PlayerController from '../controllers/PlayerController';
import { Player } from '../models/Player';
import { ApiError } from '../utils/http.util';

const playerRouter = Router();
const playerController = new PlayerController();
playerRouter.post('/game/:gameId/team/:teamId', async (req: Request, res: Response): Promise<void> => {
    const { gameId, teamId } = req.params;
    const player: Player = req.body as Player;
    try {
        const resultat = await playerController.addPlayerToTeam(
            teamId, player
        );
        console.log(resultat);

        res.json(resultat);
    }
    catch (error) {
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
    }
});

export default playerRouter;
