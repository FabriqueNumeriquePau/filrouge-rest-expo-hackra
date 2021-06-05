import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { environment } from "../configs/config";
import { Payload } from "../models/User";
import { ApiError, HttpResponse } from "../utils/http.util";



function checkJwt(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        next();
    }
    const authorization = req.headers.authorization;
    if (authorization === undefined || authorization === '') {
        const error = new ApiError(HttpResponse.FORBIDDEN, checkJwt.name, 'Jwt is missing');
        res.status(error.code).json(error);
        return;
    }
    const token = authorization.split(' ')[1];

    try {
        const payload = verify(token, environment.JWT_SECRET) as Payload;
        req.user = payload;
        next();
    }
    catch (err) {
        const error = new ApiError(HttpResponse.FORBIDDEN, checkJwt.name, 'invalid token');
        res.status(error.code).json(error);
        return;
    }
}

export default checkJwt;