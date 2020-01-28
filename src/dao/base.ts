import {join} from 'path';
import {writeJsonSync,readJSONSync,existsSync, ensureFile,ensureFileSync, ensureDir, readJSON} from "fs-extra";

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

export class BaseDao<T extends IBase> {
  fileLoc: string;

  db:T[];

  constructor(key: string) {
    this.fileLoc = join(baseDir, key+".json");
    this.init();
  }

  init=()=> {
    if (existsSync(this.fileLoc)) {
      this.db = readJSONSync(this.fileLoc);
    } else {
      this.db = [];
       ensureFileSync(this.fileLoc);
      this.dump();
    }

    process.on('exit', (code) => {
      this.dump();
    });
  }


  public async findById(id:string){
    // @ts-ignore
    let [taskInfo] = this.db.filter((item)=>item.id==id);
    return taskInfo;
  }


  public async add (item:T) {
    let time =Date.now();
    this.db.push({createTime:time, ...item});
    await this.dump();
  }

  del(id:string) {
    // @ts-ignore
    this.db=this.db.filter((item)=>item.id!==id);
  }

  async update(id,updateItem:Partial<T>) {
    let item = await this.findById(id);
    for (let updateItemKey in updateItem) {
      if(item.hasOwnProperty(updateItemKey)){
        item[updateItemKey] = updateItem[updateItemKey];
      }
    }

    item.updateTime =Date.now();
    this.dump();
  }

  dump() {
    writeJsonSync(this.fileLoc,this.db,{spaces:2});
  }
}

export interface IBase{
  id:string;
  createTime?:number;
  updateTime?:number;
}
