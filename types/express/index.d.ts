import 'express-serve-static-core';

import { User } from '@custom-types/custom-types';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}