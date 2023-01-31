import { Role } from '@custom-types/custom-types';
import ApiError from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';

const verifyRole = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) throw new ApiError(401, 'Unauthorized - invalid role');
        next();
    };
};

export default {
    verifyRole,
};