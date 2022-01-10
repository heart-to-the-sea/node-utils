export interface LoggerOutPutI {
  info(...args:any):void
  warn(...args:any):void
  error(...args:any):void
}
export enum LOG_TYPE{
  info = "INFO",
  warn = "WARN",
  error = "ERROR"
}

export interface LoggerConfig{
  time: boolean
}

export class Logger implements LoggerOutPutI{
  config:LoggerConfig = {
    time: true,
  }
  private log(type: LOG_TYPE, ...args: any): void {
    let time = new Date().toLocaleString();
    switch(type){
      case LOG_TYPE.info:
        console.log(`[${time} %c ${type}]: `,...args)
        break;
      case LOG_TYPE.warn:
        console.log(`[${time} %c ${type}]: `,...args)
        break;
      case LOG_TYPE.error:
        console.log(`[${time} %c ${type}]: `,...args)
        break;
      default:
        break;
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