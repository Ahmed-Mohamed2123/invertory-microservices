import * as winston from 'winston';

enum LogLevel {
    ERROR = 'error',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn'
}

interface LogMessage {
    title: string;
    data?: Record<string, any>;
    level?: LogLevel;
}

const winstonLogger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'cyan',
                debug: 'green',
            },
        }),
        winston.format.printf(context => {
            const { title, level, data } = JSON.parse(context.message);
            return JSON.stringify({
                level: level,
                timestamp: context.timestamp,
                title: title,
                data: data,
            }, null, '\t');
        }),
    ),
});

const logger = {
    logMessage: (logMessage: LogMessage) => {
        const { title, data } = logMessage;
        winstonLogger.log(logMessage.level ?? LogLevel.INFO, JSON.stringify({
            title,
            data: data ?? {},
            level: logMessage.level ?? LogLevel.INFO,
        }));
    },
};
export { logger, LogMessage, LogLevel };