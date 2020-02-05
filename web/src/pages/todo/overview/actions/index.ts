import {Command} from '../constant';
import {redux} from 'moon-runtime';
import Action from './action';
import * as main from '../reducers/main';

import {IAllReducerProps} from '../types';

export class PageModel extends redux.BaseModel<IAllReducerProps> {
  actions = {
    action: new Action(this),
  };

  constructor() {
    super('TodoOverview', {
      main,
    });
  }

  /**
   * 初始化数据
   */
  async init() {

    this.emit(Command.init, {
      main : {
        tongji:{
          current:{},
          last:window.checkSdk.dao.tongjiDao.getDayTonji(-1),
          avg:getAvgData(),
        },
      },
    });

    this.actions.action.reloadDb();
  }
}



export default new PageModel();


function getAvgData(){
  let nearDays = [];
  for(let i=-1,ilen=-6;i>ilen;i--) {
    nearDays.push(window.checkSdk.dao.tongjiDao.getDayTonji(i));
  }

  let {morning,total,night,afterNoonn}  = nearDays.reduce((acc,next)=>{
    acc.morning+=next.morning;
    acc.afterNoonn+=next.afterNoonn;
    acc.night+=next.night;
    acc.total+=next.total;
    return acc;
  },{
    morning:0,
    afterNoonn:0,
    night:0,
    total:0,
  });



  return {
    morning:morning/5,
    total:total/5,
    night:night/5,
    afterNoonn:afterNoonn/5
  }



}

//create by moon https://github.com/creasy2010/moon
