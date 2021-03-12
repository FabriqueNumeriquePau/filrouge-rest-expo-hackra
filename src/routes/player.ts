import { Request, Response, Router } from 'express';
import PlayerController from '../controllers/PlayerController';
import { Player } from '../models/Player';

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
    catch(error) {
        res.status(500).send(error);
    }
});

export default playerRouter;
