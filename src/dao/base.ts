import {join} from 'path';
import {writeJsonSync,readJSONSync,existsSync, ensureFile, ensureDir, readJSON} from "fs-extra";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
const baseDir: string = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);

export class BaseDao<T=any> {
  fileLoc: string;

  db:T[];

  constructor(key: string) {
    this.fileLoc = join(baseDir, key+".json");
    this.init();
  }

  init=async ()=> {
    if (existsSync(this.fileLoc)) {
      this.db = readJSONSync(this.fileLoc);
    } else {
      this.db = [];
      await ensureFile(this.fileLoc);
      this.dump();
    }

    process.on('exit', (code) => {
      this.dump();
    });
  }

  add = async (item:T) =>{
    this.db.push(item);
    await this.dump();
  }

  del(id:string) {
    //@ts-ignore
    this.db=this.db.filter((item)=>item.id!==id);
  }

  update(item:T){

  }

  dump() {
    writeJsonSync(this.fileLoc,this.db);
  }
}
