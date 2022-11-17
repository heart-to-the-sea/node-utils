# node-utils
node工具类
## 包含类

 1. logger日志处理 :部分完成，使用请看demo
 2. 通过配置 node.utils.config.yml 实现整个工具类的统一配置（目前支持log模块的简单配置）
 3. 日志文件可输出到本地文件中持久化存储
### node.utils.config.yml

  这个文件在运行node命令的文件目录下配置
#### log模块 node.utils.config.yml
```yml
log:
  pid: true                       # 打印PID
  console: true                   # 控制台输出
  time: true                      # 打印时间日期
  out:
    path: ./logs                  # 输出日志文件夹
    name: 'YYYY-MM-DD HH:mm:ss'   # 名称格式
    ext: 'log'                    # 后缀
    size: 100M                    # 文件按照大小分割 暂未实现
```

## 样式
```typescript
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
```
```
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  false
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  初始化node.utils.config.yml
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  { log: { pid: true, console: true, time: true } }
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  { pid: true, console: true, time: true }
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  string
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  12313123
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  false
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  null
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  undefined
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  [ 1, 2, 3, 4, 5 ]
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  { name: 'test' }
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  Symbol(test)
[2022/1/11 下午3:28:37 INFO ] (pid: 12068) :  测试
[2022/1/11 下午3:28:37 WARN ] (pid: 12068) :  测试
[2022/1/11 下午3:28:37 ERROR ] (pid: 12068) :  测试
```

## 结束语

该模块会在后期集成更多的实用的功能，希望通过引入一个依赖，解决大部分问题，当然之后的模块会尽量以插件的形式引入，达到按需使用按需加载的目的
