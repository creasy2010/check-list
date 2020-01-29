import {Command} from '../constant';
import {IAllReducerProps, IMainReducer, ITaskInfoExt} from '../types';
import {redux} from 'moon-runtime';
import {PageModel} from './index';
import api from '@/api';
import {groupBy} from 'lodash';
import {IRecord, ITaskInfo} from "../../../../../../typings/global";

export default class Action extends redux.BaseAction<IAllReducerProps> {
  constructor(pageModel: PageModel) {
    super(pageModel);
  }


  /**
   * 提交记录信息;
   */
  async submitRecord(toRecordIds,toFinishIds=[]) {
   let {main:{tasks}} =  this.state;

    toFinishIds.forEach(window.checkSdk.dao.taskDao.finishTask);
    toRecordIds.forEach((item)=>{
      window.checkSdk.dao.taskRecordDao.add({
        taskId:item
      })
    });

    await this.reloadDb();
  }

  /**
   * 删除任务;
   * @param taskId
   */
  delTask(taskId:string){
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
    await window.checkSdk.dao.taskDao.finishTask(taskId);
  }
  /**
   * 记录一个任务完成记录;
   */
  oneTaskRecordasync:()=>{

  }

  /**
   * 重新加载数据
   */
  reloadDb() {
    let records:IRecord = window.checkSdk.dao.taskRecordDao.db;
    let group = groupBy(records,(record)=>record.taskId);
    let tasks:ITaskInfoExt =window.checkSdk.dao.taskDao.db.map((taskInfo:ITaskInfo)=>{
      return {...taskInfo,records:group[taskInfo.id]||0}
    });

    this.commonChange('main',(main:IMainReducer)=>{
      main.tasks =[...tasks];
      main.records =[...records];
      return main;
    });
  }
}

//create by moon https://github.com/creasy2010/moon
