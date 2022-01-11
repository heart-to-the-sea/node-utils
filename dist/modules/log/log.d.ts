import { LoggerConfig } from "../../config/config";
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
export declare class Logger implements LoggerOutPutI {
    config: LoggerConfig;
    constructor(config?: LoggerConfig | undefined);
    private log;
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}
