export interface LoggerOutPutI {
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}
export declare enum LOG_TYPE {
    info = "INFO",
    warn = "WARN",
    error = "ERROR"
}
export interface LoggerConfig {
    time?: boolean;
    console?: boolean;
    pid?: boolean;
}
export declare class Logger implements LoggerOutPutI {
    config: LoggerConfig;
    constructor(config?: LoggerConfig);
    private log;
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}
