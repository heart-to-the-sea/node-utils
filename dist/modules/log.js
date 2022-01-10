"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_TYPE = void 0;
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["info"] = "INFO";
    LOG_TYPE["warn"] = "WARN";
    LOG_TYPE["error"] = "ERROR";
})(LOG_TYPE = exports.LOG_TYPE || (exports.LOG_TYPE = {}));
class Logger {
    constructor() {
        this.config = {
            time: true,
        };
    }
    log(type, ...args) {
        let time = new Date().toLocaleString();
        switch (type) {
            case LOG_TYPE.info:
                console.log(`[${time} %c ${type}]: `, ...args);
                break;
            case LOG_TYPE.warn:
                console.log(`[${time} %c ${type}]: `, ...args);
                break;
            case LOG_TYPE.error:
                console.log(`[${time} %c ${type}]: `, ...args);
                break;
            default:
                break;
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
exports.default = Logger;
