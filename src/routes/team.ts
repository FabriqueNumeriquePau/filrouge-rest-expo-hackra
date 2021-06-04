import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import { Team } from '../models/Team';
import { ApiError } from '../utils/http.util';

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
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
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
        if (error instanceof ApiError) {
            res.status(error.code).json(error);
        }
        res.status(500).send(error.toString());
    }
});

export default teamRouter;