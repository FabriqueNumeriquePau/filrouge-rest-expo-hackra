import { hash, verify } from "argon2";
import { AuthInput, AuthOutput, Payload, User, UserModel } from "../models/User";
import { sign } from 'jsonwebtoken';
import { environment } from "../configs/config";
import { ForbiddenError } from "../exceptions/httpExceptions";
import { ApiError, HttpResponse } from "../utils/http.util";

class UserController {

    private readonly model = UserModel;

    constructor() { }

    async signup(user: User): Promise<User> {
        const userDb = await this.model.findOne({ username: user.username });
        if (userDb) {
            throw new ApiError(HttpResponse.BAD_REQUEST, `${UserController.name}.${this.signup.name}`, `${user.username} already exists`);
        }

        const userModel = new UserModel(user);
        if (userModel.errors) {
            throw new ApiError(HttpResponse.BAD_REQUEST, `${UserController.name}.${this.signup.name}`, userModel.errors.message);
        }
        userModel.createdAt = new Date();
        userModel.password = await hash(user.password);
        const { password, ...acount } = await userModel.save();
        return acount as User;
    }

    async signin(auth: AuthInput): Promise<AuthOutput> {
        const userDb = await this.model.findOne({ username: auth.username });
        if (!userDb) {
            throw new ApiError(HttpResponse.FORBIDDEN, `${UserController.name}.${this.signup.name}`, `Incorrecte login`);
        }

        if (await verify(userDb.password, auth.password)) {
            const payload = {
                userId: userDb.id,
                createdAt: userDb.createdAt,
                role: userDb.role
            } as Payload;
            const { password, ...account } = userDb;
            return {
                user: account,
                jwt: sign(payload, environment.JWT_SECRET, { expiresIn: environment.JWT_EXPIRE })
            } as AuthOutput;
        }
        throw new ApiError(HttpResponse.FORBIDDEN, `${UserController.name}.${this.signin.name}`, `Incorrecte login`);
    }
}

export default UserController;