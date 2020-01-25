import {Command} from '../constant';
import {IAllReducerProps} from '../types';
import {redux} from 'moon-runtime';
import {PageModel} from './index';
import api from '@/api';

export default class Action extends redux.BaseAction<IAllReducerProps> {
  constructor(pageModel: PageModel) {
    super(pageModel);
  }

  addTask(title:string) {
    window.checkSdk.dao.taskDao.add({
      id:Date.now()+"",
      title,
    })

    this.commonChange('main.tasks',[...window.checkSdk.dao.taskDao.db]);

  }
}

//create by moon https://github.com/creasy2010/moon
