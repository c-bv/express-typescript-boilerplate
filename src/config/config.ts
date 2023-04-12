import * as dotenv from 'dotenv';
import * as path from 'path';

interface IConfig {
    env: string;
    app: {
        name: string;
        port: string;
    };
    db: {
        uri: string;
        config: {
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
        };
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    mail: {
        host: string;
        port: string;
        user: string;
        pass: string;
    };
};

dotenv.config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const config: IConfig = {
    env: process.env.NODE_ENV!,
    app: {
        name: process.env.APP_NAME!,
        port: process.env.PORT!
    },
    db: {
        uri: process.env.DB_URI!,
        config: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_EXPIRES_IN!,
    },
    rateLimit: {
        windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
        max: Number(process.env.RATE_LIMIT_MAX)
    },
    mail: {
        host: process.env.MAIL_HOST!,
        port: process.env.MAIL_PORT!,
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!
    }
};

export default config;