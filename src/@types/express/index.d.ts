import { Payload } from "../../models/User";

declare global {
    namespace Express {
        interface Request {
            user: Payload | undefined;
        }
    }
}