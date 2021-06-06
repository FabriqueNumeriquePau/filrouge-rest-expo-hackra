import { ObjectId } from "bson";
import { Document, Schema } from "mongoose";
import { Player, PlayerSchema } from "./Player";

export interface Team extends Document {
    score: number;
    user: ObjectId;
    players: Player[];
}


export const TeamSchema = new Schema({
    score: { type: Number },
    userId: { type: ObjectId },
    players: [PlayerSchema]

});
