import { NextFunction, Request, Response } from "express";
import { Role } from "../models/User";
import { ApiError, HttpResponse } from "../utils/http.util";

export function adminRole(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
        if (req.user.role !== Role.Admin) {
            const error = new ApiError(HttpResponse.FORBIDDEN, 'Role', 'Forbidden');
            res.status(error.code).json(error);
            return;
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
    const error = new ApiError(HttpResponse.FORBIDDEN, 'Role', 'Forbidden');
    res.status(error.code).json(error);
    return;
}
