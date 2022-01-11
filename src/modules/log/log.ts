import { resolve } from "path";
import { STYLE_COLOR } from "./color";
import { LoggerConfig, OutConfigI } from "../../config/config";
import { LogConfigYaml } from "../../config/configYaml";
import { configHandler } from "../../config/configHandler";
import { createWriteStream, mkdirSync, WriteStream } from "fs";
import moment from "moment";

export interface LoggerOutPutI {
  info (...args: any): void
  warn (...args: any): void
  error(...args: any): void
}
export enum LOG_TYPE{
  start = "START",
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
  writeFile :WriteFile|undefined;
  constructor(config ?:LoggerConfig|undefined) {
    this.start(typeof config === 'string')
    if (typeof config === 'object'){
      this.config = config
    } else if(!config && configHandler.isNodeUtilsConfigYml(base_path)) { // 如果不存在就对其取反
      this.initConfigYml()
    }
    this.initConfig()
  }
  // 初始化本类配置
  initConfig(){
    if(this.config){
      if(this.config.out){
        this.writeFile = new WriteFile(this.config.out)
      }
    }
  }
  // 初始化yml
  initConfigYml(){
    try{
      this.start("初始化node.utils.config.yml")
      const configYml = new LogConfigYaml(base_path).get()
      if(configYml?.log) {
        this.config = Object.assign(this.config,configYml.log)
      }
    } catch (e) {
      this.error(e)
      this.warn("初始化失败，赋值为默认")
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
      case LOG_TYPE.start:
        color = STYLE_COLOR.magenta
      default:
        break;
    }
    
    if(this.config.console){
      if (this.config.pid) {
        console.log(`[${time} ${color} ] (pid: %s) : `,type, pid , ...args)
        if(this.writeFile){
          this.writeFile.write(`[${time} ${type} ] (pid: ${pid}) : ${JSON.stringify(args)}`)
        }
      } else {
        console.log(`[${time} ${color} ] : `,type , ...args)
        if(this.writeFile){
          this.writeFile.write(`[${time} ${type} ] : ${args}`)
        }
      }
    }
    
  }
  private start(...args: any): void {
    this.log(LOG_TYPE.start,...args)
  }
  info(...args: any): void {
    this.log(LOG_TYPE.info,...args)
  }
  warn(...args: any): void {
    this.log(LOG_TYPE.warn,...args)
  }
  error(...args: any): void {
    this.log(LOG_TYPE.error,...args)
  }

}
class WriteFile {
  private config!:OutConfigI
  private wStream !:WriteStream
  constructor(config:OutConfigI) {
    this.config = config
    this.init()
  }
  private init(){
    if(this.config){
      const outPut  = this.config.path|| resolve(base_path,"./logs")
      const name = moment().format(this.config.name)
      const ext = this.config.ext || 'log'
      try {
        mkdirSync(outPut)
      } catch (error) {
        
      }
      this.wStream = createWriteStream(resolve(outPut,+''+name+'.'+ext),{
        encoding:"utf-8",
      })
    }
  }
  public write(args:any){
    this.wStream.write(args+'\r\n')
  }
}
