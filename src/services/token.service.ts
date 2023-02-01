import config from '@config/config';
import { IUser } from '@custom-types/custom-types';
import ApiError from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface IRequest extends Request {
    user?: any;
}

const generateAuthToken = (user: IUser) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwt.secret as string, { expiresIn: config.jwt.expiresIn });
};

const verifyAuthToken = (req: IRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) throw new ApiError(401, 'Unauthorized - no token provided');
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwt.secret as string, (err, decoded) => {
        if (err) throw new ApiError(401, 'Unauthorized - invalid token');
        req.user = decoded;
        next();
    });
};

export default {
    generateAuthToken,
    verifyAuthToken,
};