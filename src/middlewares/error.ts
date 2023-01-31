import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import env from '@config/config';
import ApiError from '@utils/ApiError';

const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        error = new ApiError(
            err.status || httpStatus.INTERNAL_SERVER_ERROR,
            err.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
            err.stack
        );
    }
    next(error);
};

const handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        ...(env.env === 'development' && { stack: err.stack })
    };
    res.status(err.status).send(response);
}

export default { converter, handler };