import { abstractLogConfig } from "./abstractConfig";
import { ConfigI } from "./config";
import yamljs from 'yamljs'
import { readFileSync } from "fs";
export class LogConfigYaml extends abstractLogConfig<ConfigI> {
  private config ?:ConfigI
  constructor(path:string) {
    super(path)
    this.init()
  }
  init(){
    const val = yamljs.load(this.path)
    if(val) {
      this.config=val
    }
  }

  handler(): this {
    throw new Error("Method not implemented.");
  }

  get(): ConfigI | null {
    return this.config || null
  }
}