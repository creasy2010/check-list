export const BASE = 'MoonList_';

export enum Command {
  //通用修改数据方法
  commonChange = 'MoonList_commonChange',
  init = 'MoonList_INIT',
  clean = 'MoonList_CLEAN',

  /*
        修改查询条件数据
    */
  modifyRequest = 'MoonList_modifyRequest',

  /*
        清空查询结果
    */
  cleanList = 'MoonList_cleanList',

  /*
        
    */
  queryResult = 'MoonList_queryResult',
}
