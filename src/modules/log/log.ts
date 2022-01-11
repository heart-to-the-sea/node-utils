import { dirname, resolve } from "path";
import { cwd } from "process";
import { STYLE_COLOR } from "./color";
import { LoggerConfig } from "../../config/config";
import { LogConfigYaml } from "../../config/configYaml";
import { configHandler } from "../../config/configHandler";

export interface LoggerOutPutI {
  info (...args: any): void
  warn (...args: any): void
  error(...args: any): void
}
export enum LOG_TYPE{
  info  = "INFO",
  warn  = "WARN",
  error = "ERROR"
}
// 获取命令所在的路径
const base_path = resolve("./",'node.utils.config.yml');
export class Logger implements LoggerOutPutI{
  config: LoggerConfig = {
    time: true,
    console: true,
    pid : true
  }
  constructor(config ?:LoggerConfig|undefined) {
    this.info(typeof config === 'string')
    if (typeof config === 'object'){
      this.config = config
    } else if(!config && configHandler.isNodeUtilsConfigYml(base_path)) { // 如果不存在就对其取反
      try{
        this.info("初始化node.utils.config.yml")
        const configYml = new LogConfigYaml(base_path).get()
        this.info(configYml)
        if(configYml?.log) {
          this.info(configYml.log)
          this.config = configYml.log
        }
      } catch (e) {
        this.error(e)
        this.warn("初始化失败，赋值为默认")
      }
    }
  }
  // 构建log
  private log(type: LOG_TYPE, ...args: any): void {
    let time = this.config.time? new Date().toLocaleString(): '';
    let color: string= '';
    let pid = process.pid;
    switch(type){
      case LOG_TYPE.info:
        color = STYLE_COLOR.green
        break;
      case LOG_TYPE.warn:
        color = STYLE_COLOR.yellow
        break;
      case LOG_TYPE.error:
        color = STYLE_COLOR.red
        break;
      default:
        break;
    }
    
    if(this.config.console){
      if (this.config.pid) {
        console.log(`[${time} ${color} ] (pid: %s) : `,type, pid , ...args)
        return
      }
      console.log(`[${time} ${color} ] : `,type , ...args)
    }
  }
  info(...args: any): void {
    this.log(LOG_TYPE.info,...args)
  }
  warn(...args: any): void {
    this.log(LOG_TYPE.warn,...args)
  }
  error(...args: any): void {
    this.log(LOG_TYPE.error,...args)
  }}
  