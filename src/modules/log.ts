interface LoggerI {
  info(...args:any):void
  warn(...args:any):void
  error(...args:any):void
}
interface LoggerConfig{}

export default class Logger {
}