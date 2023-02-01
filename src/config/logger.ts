import winston from 'winston';
import config from '@config/config';

const enumerateErrorFormat = winston.format((info: any) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ]
});

config.env !== 'production' && logger.add(new winston.transports.Console({
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        winston.format.printf((info: any) => `${info.level}: ${info.message}`)
    )
}));

export default logger;