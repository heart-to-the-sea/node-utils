import {Logger} from '../src/index'
const logger = new Logger.Logger()
const testDemo:Array<any> = [
  "string",
  12313123,
  false,
  null,
  undefined,
  [1,2,3,4,5],
  {name:"test"},
  Symbol("test")
]

setInterval(()=>{
  testDemo.forEach((item)=>{
    logger.info(item)
  })
  logger.info("测试")
  logger.warn("测试")
  logger.error("测试")
},500)
// testDemo.forEach((item)=>{
//   logger.warn(item)
// })
// testDemo.forEach((item)=>{
//   logger.error(item)
// })
// testDemo.forEach(logger.info.bind(logger))
