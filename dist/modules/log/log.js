"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LOG_TYPE = void 0;
const path_1 = require("path");
const color_1 = require("./color");
const configYaml_1 = require("../../config/configYaml");
const configHandler_1 = require("../../config/configHandler");
const fs_1 = require("fs");
const moment_1 = __importDefault(require("moment"));
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["start"] = "START";
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
        this.start(typeof config === 'string');
        if (typeof config === 'object') {
            this.config = config;
        }
        else if (!config && configHandler_1.configHandler.isNodeUtilsConfigYml(base_path)) { // 如果不存在就对其取反
            this.initConfigYml();
        }
        this.initConfig();
    }
    // 初始化本类配置
    initConfig() {
        if (this.config) {
            if (this.config.out) {
                this.writeFile = new WriteFile(this.config.out);
            }
        }
    }
    // 初始化yml
    initConfigYml() {
        try {
            this.start("初始化node.utils.config.yml");
            const configYml = new configYaml_1.LogConfigYaml(base_path).get();
            if (configYml === null || configYml === void 0 ? void 0 : configYml.log) {
                this.config = Object.assign(this.config, configYml.log);
            }
        }
        catch (e) {
            this.error(e);
            this.warn("初始化失败，赋值为默认");
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
            case LOG_TYPE.start:
                color = color_1.STYLE_COLOR.magenta;
            default:
                break;
        }
        if (this.config.console) {
            if (this.config.pid) {
                console.log(`[${time} ${color} ] (pid: %s) : `, type, pid, ...args);
                if (this.writeFile) {
                    this.writeFile.write(`[${time} ${type} ] (pid: ${pid}) : ${JSON.stringify(args)}`);
                }
            }
            else {
                console.log(`[${time} ${color} ] : `, type, ...args);
                if (this.writeFile) {
                    this.writeFile.write(`[${time} ${type} ] : ${args}`);
                }
            }
        }
    }
    start(...args) {
        this.log(LOG_TYPE.start, ...args);
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
class WriteFile {
    constructor(config) {
        this.config = config;
        this.init();
    }
    init() {
        if (this.config) {
            const outPut = this.config.path || (0, path_1.resolve)(base_path, "./logs");
            const name = (0, moment_1.default)().format(this.config.name);
            const ext = this.config.ext || 'log';
            try {
                (0, fs_1.mkdirSync)(outPut);
            }
            catch (error) {
            }
            this.wStream = (0, fs_1.createWriteStream)((0, path_1.resolve)(outPut, +'' + name + '.' + ext), {
                encoding: "utf-8",
            });
        }
    }
    write(args) {
        this.wStream.write(args + '\r\n');
    }
}
