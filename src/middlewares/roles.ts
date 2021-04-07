import { NextFunction, Request, Response } from "express";
import { Role } from "../models/User";

export function adminRole(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        if (req.user.role !== Role.Admin) {
            res.sendStatus(403);
        }
        next();
    }
}

export function teamRole(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        if (req.user.role === Role.Team) {
            next();
        }
    }
    res.status(403);
}
