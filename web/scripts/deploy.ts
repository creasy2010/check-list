
import shelljs from "shelljs";
import {join} from  'path';

(async()=>{
  let targetDir = "/Users/dong/Falcon/moon-coder.github.io";
  shelljs.cp("-rf",join(__dirname,"../dist/*"),targetDir)

  if(shelljs.exec(`cd ${targetDir} && git pull`).code !==0){
    throw new Error('执行命令 git add . 出错');
  }
  if(shelljs.exec(`cd ${targetDir} && git add .`).code !==0){
    throw new Error('执行命令 git add . 出错');
  }

  if(shelljs.exec(`cd ${targetDir} && git commit -m 'auto'`).code !==0){
    throw new Error('执行命令 git commit -m \'auto\' 出错');
  }

  if(shelljs.exec(`cd ${targetDir} && git push`).code !==0) {
    throw new Error('执行命令 git push 出错');
  }
})();
