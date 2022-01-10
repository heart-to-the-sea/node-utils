import { STYLE_COLOR } from "./color";

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

export interface LoggerConfig{
  time?: boolean,
  console?: boolean,
  pid?: boolean
}

export class Logger implements LoggerOutPutI{
  config: LoggerConfig = {
    time: true,
    console: true,
    pid : true
  }
  constructor(config ?:LoggerConfig) {
    if (config){
      this.config = config
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
  