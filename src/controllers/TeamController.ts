import { ObjectId } from "bson";
import { Aggregate, Query } from "mongoose";
import { Game, GameModel } from "../models/Game";
import { Team } from "../models/Team";
import { ApiError, HttpResponse } from "../utils/http.util";

class TeamController {

    private readonly model = GameModel;
    constructor() { }

    async getTeam(id: string): Promise<Team[]> {
        try {
            const game = await this.model.findById(id);

            if (!game) {
                throw new ApiError(HttpResponse.NOT_FOUND, `${TeamController.name}.${this.getTeam.name}`, `Game #${id} not found`);
            }
            return game.teams;
        }
        catch (err) {
            throw new ApiError(HttpResponse.INTERNAL_ERROR, `${TeamController.name}.${this.getTeam.name}`, err.toString());
        }
    }

    async getTeamById(gameId: string, teamId: string): Promise<Team | void> {
        try {
            const game = await this.model.findById(gameId);
            const team = game.teams.find(t => t.id === teamId);
            if (!team) {
                throw new ApiError(HttpResponse.NOT_FOUND, `${TeamController.name}.${this.getTeamById.name}`, `Team #${teamId} not found`);
            }
        }
        catch (err) {
            throw new ApiError(HttpResponse.INTERNAL_ERROR, `${TeamController.name}.${this.getTeamById.name}`, err.toString());
        }

    }

    async addTeamsToGame(gameId: string, team: Team): Promise<Team[]> {
        const game = await this.model.findById(gameId);
        game.teams.push(team);
        const teamModel = new GameModel(game);
        return (await teamModel.save()).teams;
    }

}
export default TeamController;