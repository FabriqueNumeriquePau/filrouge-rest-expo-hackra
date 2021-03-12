import { Query } from "mongoose";
import { GameModel } from "../models/Game";
import { Team, TeamModel } from "../models/Team";

class GameController {

    private readonly model = GameModel;
    constructor() { }
}


export default GameController;