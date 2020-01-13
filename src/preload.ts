/**
 * @desc
 *
 * @使用场景
 *
 * @company yangxiaodong
 * @Date    2019/6/2
 **/

import {ipcRenderer} from 'electron';
import * as urllib from  'urllib';
import * as fsExtra from  'fs-extra';
import * as path from 'path';
import {TaskRecordDao,TaskCateDao,TaskDao} from './dao';
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
});

console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
ipcRenderer.send('asynchronous-message', 'ping');

process.once('loaded', () => {
  const _setImmediate = setImmediate;
  const _clearImmediate = clearImmediate;

  global.setImmediate = _setImmediate;
  global.clearImmediate = _clearImmediate;

  // the host page will have access to `window.readConfig`,
  // but not direct access to `readFileSync`
});

//@ts-ignore
window.readConfig = function() {
  ipcRenderer.send('asynchronous-message', 'ping');
};

//@ts-ignore
window.checkSdk = {
  api:{
    urllib,
    fsExtra,
    path
  },
  dao:{
    taskRecordDao:new TaskRecordDao(),
    taskCateDao:new TaskCateDao(),
    taskDao:new TaskDao()
  },
  context: {
    pwd: process.cwd(),
    projectName:"",// TODO 添加 这个信息;
  }
};
