/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/
import {baseDir} from  './const';
import {join} from 'path';
import {writeJsonSync,readJSONSync,existsSync, ensureFile,ensureFileSync, ensureDir, readJSON} from "fs-extra";
import {debounce} from  'lodash';
import {v1} from 'uuid';


export class JsonBaseDao<T=any>{
  fileLoc: string;
  data:T;

  constructor(key: string,defaultValue:T) {
    this.fileLoc = join(baseDir, key+".json");
    this.init();
    this.data=defaultValue;
  }

  init=()=> {
    if (existsSync(this.fileLoc)) {
      this.data = readJSONSync(this.fileLoc);
    } else {
      ensureFileSync(this.fileLoc);
      this.dump();
    }
    process.on('exit', (code) => {
      this.dump();
    });
  }

  //5秒才会真正被执行;
  dump=debounce(()=> {
    if(this.data){
      writeJsonSync(this.fileLoc,this.data,{spaces:2});
    }
  },800)

}