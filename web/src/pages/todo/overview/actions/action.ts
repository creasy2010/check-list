import {Command} from '../constant';
import {IAllReducerProps} from '../types';
import {redux} from 'moon-runtime';
import {PageModel} from './index';
import api from '@/api';

export default class Action extends redux.BaseAction<IAllReducerProps> {
  constructor(pageModel: PageModel) {
    super(pageModel);
  }

  /**
   * 删除任务;
   * @param taskId
   */
  delYask(taskId:string){
    window.checkSdk.dao.taskDao.del(taskId);
    this.reloadDb();
  }

  addTask(title:string) {
    window.checkSdk.dao.taskDao.add({
      id:Date.now()+"",
      title,
    })
    this.reloadDb();
  }

  /**
   * 完成任务,修改任务状态;
   */
  finishTask=async (taskId:string)=>{

    window.checkSdk.dao.taskDao
  }
  /**
   * 记录一个任务完成记录;
   */
  oneTaskRecordasync:()=>{

  }

  /**
   * 重新加载数据
   */
  reloadDb(){
    this.commonChange('main.tasks',[...window.checkSdk.dao.taskDao.db]);
  }
}

//create by moon https://github.com/creasy2010/moon
