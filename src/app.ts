import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import config from './config/config';
import rateLimiter from './middlewares/rateLimiter';
import router from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
    });
    next();
});

// Routes
app.use('/', router);

// Rate limiter
config.env === 'production' && app.use('/api', rateLimiter);

// Health check
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('API is online ✅');
});

// 404
app.use('*', (req: Request, res: Response) => {
    res.status(404).send('Route not found ❌');
});

export default app;