import { hash, verify } from "argon2";
import { AuthInput, AuthOutput, Payload, User, UserModel } from "../models/User";
import { sign } from 'jsonwebtoken';
import { environment } from "../configs/config";
import { ForbiddenError } from "../exceptions/httpExceptions";

class UserController {

    private readonly model = UserModel;

    constructor() { }

    async signup(user: User): Promise<User> {
        const userDb = await this.model.findOne({ username: user.username });
        if (userDb) {
            throw new Error(`${user.username} already exists`);
        }

        const userModel = new UserModel(user);
        if (userModel.errors) {
            throw new Error(userModel.errors.message);
        }
        userModel.createdAt = new Date();
        userModel.password = await hash(user.password);
        return await userModel.save();
    }

    async signin(auth: AuthInput): Promise<AuthOutput> {
        const userDb = await this.model.findOne({ username: auth.username });
        if (!userDb) {
            throw new ForbiddenError('Forbiden');
        }

        if (await verify(userDb.password, auth.password)) {
            const payload = {
                userId: userDb.id,
                createdAt: userDb.createdAt,
                role: userDb.role
            } as Payload;
            return {
                user: userDb,
                jwt: sign(payload, environment.JWT_SECRET, { expiresIn: environment.JWT_EXPIRE })
            } as AuthOutput;
        }
        throw new Error('Forbiden');
    }
}

export default UserController;