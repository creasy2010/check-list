import {Command} from '../constant';
import {IAllReducerProps, IMainReducer, ITaskInfoExt} from '../types';
import {redux} from 'moon-runtime';
import pageModel,{PageModel} from './index';
import api from '@/api';
import {message} from  'antd';
import {groupBy} from 'lodash';
import {IRecord, ITaskInfo, ITongJi} from "../../../../../../typings/global";
import {getLocal,saveLocal} from "@/service/storage";


const maxSubmitCount=3;
const maxTopCount=5;
const zhouqi=35*0.7*60*1000;

export default class Action extends redux.BaseAction<IAllReducerProps> {
  constructor(pageModel: PageModel) {
    super(pageModel);
  }

  /**
   * 提交记录信息;
   */
  async submitRecord(toRecordIds,toFinishIds=[]) {
   let {main:{tasks}} =  this.state;
   debugger;

   if(toRecordIds.length > maxSubmitCount) {
     message.warn(`每周期最多提交条${maxSubmitCount}数据; `);
     return ;
   }

    let lastTime = parseInt(getLocal('lastRecordTime')||0);

    if((Date.now() -lastTime) < zhouqi){
        message.warn(`与上次提交时间还没超过一个周期,请耐心等待`);
        return ;
    }

    saveLocal("lastRecordTime",Date.now());
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

  getTopCount=()=>{
    let  count = this.state.main.tasks
      .filter(item=>item.status!==3)
      .filter(item=>item.isTop).length;
    return count;
  }

  top=(task:ITaskInfoExt) =>{
    if(this.getTopCount() > maxTopCount) {
      message.warn(`置顶项目多于${maxTopCount},请及时处理`);
      return ;
    }

    window.checkSdk.dao.taskDao.topTask(task.id);
    this.reloadDb();
  }

  cancelTop=(task:ITaskInfoExt)=>{
    window.checkSdk.dao.taskDao.cancelTopTask(task.id);
    this.reloadDb();
  }

  addTask(task:Partial<ITaskInfo>) {
    window.checkSdk.dao.taskDao.add(task);
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
  reloadDb=()=> {
    debugger;
    let records:IRecord = window.checkSdk.dao.taskRecordDao.db;
    debugger;
    let tongjiDao = window.checkSdk.dao.tongjiDao;
    let current =   tongjiDao.getDayTonji();
    let yestoday  =   tongjiDao.getDayTonji(-1);

    let group = groupBy(records,(record)=>record.taskId);
    let tasks:ITaskInfoExt =window.checkSdk.dao.taskDao.db.map((taskInfo:ITaskInfo)=>{
      return {...taskInfo,records:(group[taskInfo.id]||[]).length}
    });

    debugger;
    pageModel.commonChange('main',(main:IMainReducer)=>{
      main.tasks =[...tasks];
      main.records =[...records];
      main.tongji={
        current:{...current},
        last:{...yestoday}
      };
      return main;
    });
  }
}

//create by moon https://github.com/creasy2010/moon
