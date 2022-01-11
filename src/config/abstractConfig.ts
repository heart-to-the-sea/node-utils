export abstract class abstractLogConfig<T> {
  // 配置url
  protected path !: string;
  constructor(path: string){
    this.path = path
  }
  abstract handler():this
  abstract get(): T|null
}