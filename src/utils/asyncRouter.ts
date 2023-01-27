import { NextFunction, Request, Response } from 'express';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

const asyncRouter = (router: any) => {
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options'];
    methods.forEach((method) => {
        const originalMethod = router[method];
        router[method] = function (path: any, ...handlers: any) {
            return originalMethod.call(this, path, ...handlers.map((handler: any) => asyncHandler(handler)));
        };
    });
    return router;
};

export default asyncRouter;