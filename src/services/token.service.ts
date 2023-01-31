import config from '@config/config';
import ApiError from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const generateAuthToken = (payload: any) => {
    return jwt.sign(payload, config.jwt.secret as string, { expiresIn: config.jwt.expiresIn });
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) throw new ApiError(401, 'Unauthorized - no token provided');
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
        if (err) throw new ApiError(401, 'Unauthorized - invalid token');
        req.user = decoded as any;
        next();
    });
};

export default {
    generateAuthToken,
    verifyAuthToken,
};