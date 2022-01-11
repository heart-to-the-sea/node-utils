"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogConfigYaml = void 0;
const abstractConfig_1 = require("./abstractConfig");
const yamljs_1 = __importDefault(require("yamljs"));
class LogConfigYaml extends abstractConfig_1.abstractLogConfig {
    constructor(path) {
        super(path);
        this.init();
    }
    init() {
        const val = yamljs_1.default.load(this.path);
        if (val) {
            this.config = val;
        }
    }
    handler() {
        throw new Error("Method not implemented.");
    }
    get() {
        return this.config || null;
    }
}
exports.LogConfigYaml = LogConfigYaml;
