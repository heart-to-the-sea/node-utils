import path from 'path'
import fs from 'fs'
export function autoUseModel (url:string){
  const dir = fs.readdirSync(url)
  dir.forEach(console.log)
}