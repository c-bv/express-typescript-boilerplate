import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const config = {
    env: process.env.NODE_ENV || 'development',
    app: {
        name: process.env.APP_NAME || 'API',
        port: process.env.PORT || 5000,
        url: process.env.APP_URL || `http://localhost:${process.env.PORT}`
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'api',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
        uri: process.env.DB_URI || ''
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    rateLimit: {
        windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
        max: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
};

export default config;