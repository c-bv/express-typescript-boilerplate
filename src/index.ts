import app from './app';
import env from './config/config';
import logger from './config/logger';

const exitHandler = () => {
    if (!server) return process.exit(1);
    server.close(() => {
        logger.info('Server closed');
        process.exit(1);
    });
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

exitSignals.map((sig) =>
    process.on(sig, () => {
        logger.info(`${sig} signal received.`);
        server && server.close();
    })
);

const server = app.listen(env.app.port, () => {
    logger.info(`Server is running on port ${env.app.port} in ${env.env} mode`);
});