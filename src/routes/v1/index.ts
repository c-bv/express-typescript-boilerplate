import express from 'express';
import config from '@/config/config';
import authRoute from './auth.route';
import docsRoute from './docs.route';
import userRoute from './user.route';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    }
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

config.env === 'development' && devRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;