import { Document, model, Model, Number, Schema } from "mongoose";

export interface Player extends Document {
    playerId: number;
    name: string;
    lastName: string;
}

export const PlayerSchema = new Schema({
    playerId: {type: Number, require: true},
    name: {type: String },
    lastName: {type: String }
});
