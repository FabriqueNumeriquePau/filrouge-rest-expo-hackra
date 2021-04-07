import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import { Team } from '../models/Team';

const teamRouter = Router();
const teamController = new TeamController();
teamRouter.get('/game/:gameId', async (req: Request, res: Response): Promise<void> => {
    try {
        const teams = await teamController.getTeam(req.params.gameId);
        res.json(teams);
    }
    catch (error) {
        res.status(500).send(error);
    }
});


teamRouter.get('/game/:gameId/team/:teamId', async (req: Request, res: Response): Promise<void> => {
    const { teamId, gameId } = req.params;
    try {
        const team = await teamController.getTeamById(gameId, teamId);
        res.json(team);
    }
    catch (error) {
        res.status(500).send(error);
    }
});


teamRouter.post('/game/:gameId', async (req: Request, res: Response): Promise<void> => {
    const { gameId } = req.params;
    const team: Team = req.body as Team;
    try {
        const resultat = await teamController.addTeamsToGame(gameId, team);
        res.json(resultat);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

export default teamRouter;