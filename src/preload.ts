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
import {genPage} from 'moon-common/lib/page/pc';
import {genTaroPage} from 'moon-common/lib/page/taro';
import {genRnPage} from 'moon-common/lib/page/rn';
import * as path from 'path';
import {IPageDefined} from 'moon-core/declarations/typings/page';
import * as fse from 'fs-extra';
import {IMoonConfig} from 'moon-core/declarations/typings/config';
import PageCompileHooks from "moon-common/lib/page/hook";
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

let defaulltMoonConfig: IMoonConfig;

let projectPath = process.cwd();
let configFilePath = path.join(projectPath, '.moon.json');
let jsConfigFilePath = path.join(projectPath, '.moon.js');
try {
  console.log('读取项目配置文件', configFilePath);
  if (fse.pathExistsSync(configFilePath)) {
    defaulltMoonConfig = fse.readJSONSync(configFilePath);
  }else if (fse.pathExistsSync(jsConfigFilePath)) {
    defaulltMoonConfig = require(configFilePath);
  } else {
    throw new Error('配置不存在:' + configFilePath);
  }
} catch (err) {
  throw new Error('配置读取失败:' + configFilePath);
}

let apiIndex = {};

try {
  apiIndex = fse.readJsonSync(
    path.join(projectPath, defaulltMoonConfig.api.dir, '_api-info.json'),
  );
} catch (err) {
  console.warn('读取api索引出错', err);
}

let pageDb = {};

try {
  pageDb = fse.readJsonSync(path.join(projectPath, 'page-def/db.json'));
} catch (err) {
  console.warn('读取api索引出错', err);
}




let hookInstance = new PageCompileHooks();

//加载插件;
try{
  defaulltMoonConfig.api.plugins.map(item=>{
    item.apply(hookInstance)
  });
} catch(err){
  console.error(err);
}





//@ts-ignore
window.moon = {
  api:{
    urllib,
    fsExtra,
    path
  },
  context: {
    apiIndex,
    pageDb: pageDb,
    moonConfig: defaulltMoonConfig,
    pwd: process.cwd(),
    projectName:"",// TODO 添加 这个信息;
  },
  /**
   * 仅保存数据定义;
   *
   * @param {string} projectPath
   * @param {IPageDefined} pageInfo
   * @returns {Promise<void>}
   */
  savePageInfo: async (projectPath: string, pageInfo: IPageDefined) => {
    let _path = path.join(projectPath, 'page-def/db.json');
    let db = fse.readJSONSync(_path);
    db[pageInfo.pagePath] = pageInfo;
    fse.writeJsonSync(_path, db);
  },
  /**
   * 生成页面, 并保存显示定义;
   *
   * @param {string} projectPath
   * @param {IPageDefined} pageInfo
   * @returns {Promise<void>}
   */
  generate: async (projectPath: string, pageInfo: IPageDefined) => {
    //@ts-ignore
    await window.moon.savePageInfo(projectPath, pageInfo);

    if (defaulltMoonConfig.type === 'taro-redux') {
      genTaroPage({pageInfo, projectPath},hookInstance);
    } else if (defaulltMoonConfig.type === 'h5-redux') {
      genPage({pageInfo, projectPath},hookInstance);
    } else if (defaulltMoonConfig.type === 'rn-redux') {
      genRnPage({pageInfo, projectPath},hookInstance);
    }
  },
};
