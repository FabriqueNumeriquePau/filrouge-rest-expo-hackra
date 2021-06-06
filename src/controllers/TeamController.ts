import { GameModel } from "../models/Game";
import { Team } from "../models/Team";
import { ApiError, HttpResponse } from "../utils/http.util";
import GameController from "./GameController";

class TeamController {

    private readonly gameController = new GameController();
    private readonly model = GameModel;

    constructor() { }

    async findByGame(id: string): Promise<Team[]> {
        try {
            const game = await this.gameController.findById(id);

            if (!game) {
                throw new ApiError(HttpResponse.NOT_FOUND, `${TeamController.name}.${this.findByGame.name}`, `Game #${id} not found`);
            }
            return game.teams;
        }
        catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new ApiError(HttpResponse.INTERNAL_ERROR, `${TeamController.name}.${this.findByGame.name}`, err.toString());
        }
    }

    async findById(gameId: string, teamId: string): Promise<Team | void> {
        try {
            const game = await this.model.findById(gameId);
            const team = game.teams.find(t => t.id === teamId);
            if (!team) {
                throw new ApiError(HttpResponse.NOT_FOUND, `${TeamController.name}.${this.findById.name}`, `Team #${teamId} not found`);
            }
        }
        catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new ApiError(HttpResponse.INTERNAL_ERROR, `${TeamController.name}.${this.findById.name}`, err.toString());
        }

    }

    async addTeamsToGame(gameId: string, team: Team): Promise<Team[]> {
        try {
            const game = await this.gameController.findById(gameId);
            game.teams.push(team);
            const teamModel = new GameModel(game);
            return (await teamModel.save()).teams;
        }
        catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw new ApiError(HttpResponse.INTERNAL_ERROR, `${TeamController.name}.${this.addTeamsToGame.name}`, err.toString());

        }
    }

}
export default TeamController;