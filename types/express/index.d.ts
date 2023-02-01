import 'express-serve-static-core';

import { IUser } from '@custom-types/custom-types';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}