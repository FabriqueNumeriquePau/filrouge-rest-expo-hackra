import { Query } from "mongoose";
import { Game, GameModel } from "../models/Game";
import { ApiError, HttpResponse } from "../utils/http.util";

class GameController {

    private readonly model = GameModel;
    constructor() { }


    async find(): Promise<Game[]> {
        return this.model.find();
    }

    async findById(id: string): Promise<Game> {
        const game = await this.model.findById(id);
        if (!game) {
            throw new ApiError(HttpResponse.NOT_FOUND, `${GameController.name}.${this.findById.name}`, `Game #${id} not found`);
        }
        return game;
    }

}


export default GameController;