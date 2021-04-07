import { ObjectId } from "bson";
import { Aggregate, Query } from "mongoose";
import { Game, GameModel } from "../models/Game";
import { Team } from "../models/Team";

class TeamController {

    private readonly model = GameModel;
    constructor() { }

    async getTeam(id: string): Promise<Team[]> {
        try {
            const game = await this.model.findById(id);
            return game.teams;
        }
        catch {
            throw new Error(`Game #${id} not found`);
        }
    }

    async getTeamById(gameId: string, teamId: string): Promise<Team | void> {
        try {
            const game = await this.model.findById(gameId);
            const team = game.teams.find(t => t.id === teamId);
            if (!team) {
                throw new Error(`Team #${teamId} not found`);
            }
        }
        catch {
            throw new Error(`Game #${gameId} not found`);
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