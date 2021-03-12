import { Document, model, Model, Schema } from "mongoose";
import { Player, PlayerSchema } from "./Player";

export interface Team extends Document {
    score: number;
    // username: string;
    // password: string;
    players: Player[];
}


export const TeamSchema = new Schema({
    score: {type: Number},
    // username: {type: String, 
    //     index: true,
    //     unique: true,
    //     require: true
    // },
    // password: {type: String, require: true},
    players: [PlayerSchema]
    
});
