import { Query } from "mongoose";
import { Game, GameModel } from "../models/Game";
import { Player } from "../models/Player";
import { Team } from "../models/Team";

class PlayerController {

    private readonly model = GameModel;
    constructor() {}

    async addPlayerToTeam(
        teamId: string,
        player: Player
    ): Promise<any> {
        return this.model.findOne({ teams: { $elemMatch: { _id: teamId }}});
        // console.log(team);
        // return team;
        
    }
}
export default PlayerController;