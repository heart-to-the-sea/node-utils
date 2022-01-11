import fs, { constants } from 'fs'
export class configHandler{
  static isNodeUtilsConfigYml(filePath: string): boolean{
    try {
      fs.accessSync(filePath,constants.R_OK|constants.W_OK)
      return true
    } catch {      
      return false
    }
  }
}