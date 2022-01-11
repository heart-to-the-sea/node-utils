export interface OutConfigI {
  /**
   * 文件名格式
   */
  name?: string,
  /**
   * 输出路径
   */
  path?: string,
  /**
   * 输出文件后缀
   */
  ext?: string
} 
export interface LoggerConfig{
  /**
   * 输出时间
   */
  time?: boolean,
  /**
   * 输出到控制台
   */
  console?: boolean,
  /**
   * 输出pid编号
   */
  pid?: boolean,
  /**
   * 日志输出文件路径
   */
  out?: OutConfigI
}
export interface ConfigI {
  /**
   * 日志配置
   */
  log?: LoggerConfig
}