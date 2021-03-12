import { Aggregate, Query } from "mongoose";
import { Game, GameModel } from "../models/Game";
import { Team } from "../models/Team";

class TeamController {

    private readonly model = GameModel;
    constructor() {}

    async getAllTeamsByGame(gameId: string): Promise<Team[]> {
        const game = await this.model.findOne({ _id: gameId });
        return game.teams;
    }

    async getTeamById(teamId: string): Aggregate<Team[]>{
        // const game = await this.model.findOne({ _id: gameId });
        // return game.teams;
    }

    addTeamsToGame(gameId: string, team: Team): Query<Game, Game> {
        return this.model.updateOne(
            {_id: gameId}, 
            {$push: {
                teams: team
            }});
    }
}


export default TeamController;