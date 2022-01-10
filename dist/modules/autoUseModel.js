"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUseModel = void 0;
const fs_1 = __importDefault(require("fs"));
function autoUseModel(url) {
    const dir = fs_1.default.readdirSync(url);
    dir.forEach(console.log);
}
exports.autoUseModel = autoUseModel;
