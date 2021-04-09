import { Document } from "mongoose";
import { model, Model, Schema } from "mongoose";


export enum Role {
    Admin = 'admin',
    Team = 'team'
}

export interface AuthInput {
    username: string;
    password: string;
}

export interface AuthOutput {
    jwt: string;
    user: User;
}

export interface User extends Document {
    username: string;
    password: string;
    role: Role;
    createdAt?: Date;
}

export interface Payload {
    createdAt: Date;
    role: Role;
    userId: string;
}

export const UserSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: {
        type: String,
        enum: Role,
        default: Role.Team,
        require: true
    },
    createdAt: { type: Date }
});

export const UserModel: Model<User> = model<User>('User', UserSchema);