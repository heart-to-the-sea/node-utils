"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LOG_TYPE = void 0;
const color_1 = require("./color");
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["info"] = "INFO";
    LOG_TYPE["warn"] = "WARN";
    LOG_TYPE["error"] = "ERROR";
})(LOG_TYPE = exports.LOG_TYPE || (exports.LOG_TYPE = {}));
class Logger {
    constructor(config) {
        this.config = {
            time: true,
            console: true,
            pid: true
        };
        if (config) {
            this.config = config;
        }
    }
    // 构建log
    log(type, ...args) {
        let time = this.config.time ? new Date().toLocaleString() : '';
        let color = '';
        let pid = process.pid;
        switch (type) {
            case LOG_TYPE.info:
                color = color_1.STYLE_COLOR.green;
                break;
            case LOG_TYPE.warn:
                color = color_1.STYLE_COLOR.yellow;
                break;
            case LOG_TYPE.error:
                color = color_1.STYLE_COLOR.red;
                break;
            default:
                break;
        }
        if (this.config.console) {
            if (this.config.pid) {
                console.log(`[${time} ${color} ] (pid: %s) : `, type, pid, ...args);
                return;
            }
            console.log(`[${time} ${color} ] : `, type, ...args);
        }
    }
    info(...args) {
        this.log(LOG_TYPE.info, ...args);
    }
    warn(...args) {
        this.log(LOG_TYPE.warn, ...args);
    }
    error(...args) {
        this.log(LOG_TYPE.error, ...args);
    }
}
exports.Logger = Logger;
