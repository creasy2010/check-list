const BASE = 'MoonPage_';

export enum Command {
  //通用修改数据方法
  commonChange = 'MoonPage_commonChange',
  init = 'MoonPage_INIT',
  clean = 'MoonPage_CLEAN',

  //
  actorAdd = 'MoonPage_actorAdd',
  actorDel = 'MoonPage_actorDel',

  //
  actorSubAdd = 'MoonPage_actorSubAdd',
  actorSubDel = 'MoonPage_actorSubDel',

  //
  actionAdd = 'MoonPage_actionAdd',
  actionDel = 'MoonPage_actionDel',

  //
  actionMethodAdd = 'MoonPage_actionMethodAdd',
  actionMethodDel = 'MoonPage_actionMethodDel',

  //
  componentAdd = 'MoonPage_componentAdd',
  componentDel= 'MoonPage_componentDel',

  //
  componentMethodAdd = 'MoonPage_componentMethodAdd',
  componentMethodDel = 'MoonPage_componentMethodDel',
}
