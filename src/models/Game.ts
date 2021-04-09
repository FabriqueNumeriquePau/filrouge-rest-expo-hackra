import { Document } from "mongoose";
import { model, Model, Schema } from "mongoose";
import { Team } from "./Team";
import { TeamSchema } from './Team';

export enum State {
    Waiting = 'waiting',
    Started = 'started',
    Done = 'Done'
}

export interface Game extends Document {
    startDate: string;
    startTime: string;
    endTime?: string;
    state: State;
    teams: Team[];
}

export const GameSchema = new Schema({
    startDate: { type: String, require: true },
    startTime: { type: String, require: true },
    endTime: { type: String, require: false },
    state: {
        type: String,
        enum: State,
        default: State.Waiting,
        require: true
    },
    teams: [TeamSchema]
});

export const GameModel: Model<Game> = model<Game>('Game', GameSchema);