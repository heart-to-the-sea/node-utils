"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LOG_TYPE = void 0;
const path_1 = require("path");
const color_1 = require("./color");
const configYaml_1 = require("../../config/configYaml");
const configHandler_1 = require("../../config/configHandler");
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["info"] = "INFO";
    LOG_TYPE["warn"] = "WARN";
    LOG_TYPE["error"] = "ERROR";
})(LOG_TYPE = exports.LOG_TYPE || (exports.LOG_TYPE = {}));
// 获取命令所在的路径
const base_path = (0, path_1.resolve)("./", 'node.utils.config.yml');
class Logger {
    constructor(config) {
        this.config = {
            time: true,
            console: true,
            pid: true
        };
        this.info(typeof config === 'string');
        if (typeof config === 'object') {
            this.config = config;
        }
        else if (!config && configHandler_1.configHandler.isNodeUtilsConfigYml(base_path)) { // 如果不存在就对其取反
            try {
                this.info("初始化node.utils.config.yml");
                const configYml = new configYaml_1.LogConfigYaml(base_path).get();
                this.info(configYml);
                if (configYml === null || configYml === void 0 ? void 0 : configYml.log) {
                    this.info(configYml.log);
                    this.config = Object.assign(this.config, configYml.log);
                }
            }
            catch (e) {
                this.error(e);
                this.warn("初始化失败，赋值为默认");
            }
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
