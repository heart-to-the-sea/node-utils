import { LoggerConfig, OutConfigI } from "../../config/config";
export interface LoggerOutPutI {
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}
export declare enum LOG_TYPE {
    start = "START",
    info = "INFO",
    warn = "WARN",
    error = "ERROR"
}
export declare class Logger implements LoggerOutPutI {
    config: LoggerConfig;
    writeFile: WriteFile | undefined;
    constructor(config?: LoggerConfig | undefined);
    initConfig(): void;
    initConfigYml(): void;
    private log;
    private start;
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}
declare class WriteFile {
    private config;
    private wStream;
    constructor(config: OutConfigI);
    private init;
    write(args: any): void;
}
export {};
