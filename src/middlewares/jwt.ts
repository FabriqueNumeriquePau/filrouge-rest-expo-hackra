import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { environment } from "../configs/config";
import { Payload } from "../models/User";



function checkJwt(req: Request, res: Response, next: NextFunction): void {
    console.log('Jwt ...');

    if (req.user) {
        next();
    }
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).send({
            error: 'Jwt is missing'
        });
    }
    const token = authorization.split(' ')[1];

    try {
        const payload = verify(token, environment.JWT_SECRET) as Payload;
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(401).send({
            error: 'JsonWebTokenError: invalid token'
        });
    }
}

export default checkJwt;