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
        tasks:window.checkSdk.dao.taskDao.db
      },
    });
  }
}

export default new PageModel();

//create by moon https://github.com/creasy2010/moon
