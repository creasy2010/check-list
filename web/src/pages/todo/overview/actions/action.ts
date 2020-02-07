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



   if(toRecordIds.length > maxSubmitCount) {
     message.warn(`每周期最多提交条${maxSubmitCount}数据; `);
     return ;
   }

    let lastTime = parseInt(getLocal('lastRecordTime')||0);

    if((Date.now() -lastTime) < zhouqi) {
        message.warn(`与上次提交时间还没超过一个周期,请耐心等待`);
        return ;
    }

    saveLocal("lastRecordTime",Date.now());

    await Promise.all(toFinishIds.map(window.checkSdk.dao.taskDao.finishTask));
    for(let item of toRecordIds) {
     await window.checkSdk.dao.taskRecordDao.add({
        taskId:item
      })
    }
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

  top=async (task:ITaskInfoExt) =>{
    if(this.getTopCount() > maxTopCount) {
      message.warn(`置顶项目多于${maxTopCount},请及时处理`);
      return ;
    }

    await window.checkSdk.dao.taskDao.topTask(task.id);
    this.reloadDb();
  }

  cancelTop=async (task:ITaskInfoExt)=>{
    await window.checkSdk.dao.taskDao.cancelTopTask(task.id);
    this.reloadDb();
  }

  addTask=async (task:Partial<ITaskInfo>) =>{

    if( task.targetRecords > 50 ) {
      message.error('单个任务预计完成记录,不能超过50(),请重新划分');
      return ;
    }

    await window.checkSdk.dao.taskDao.add(task);
    this.reloadDb();
  }

  /**
   * 完成任务,修改任务状态;
   */
  finishTask=async (taskInfo:ITaskInfo)=>{
    debugger
    await window.checkSdk.dao.taskDao.finishTask(taskInfo.id);
    this.reloadDb();
  }

  unFinishTask=async (taskInfo:ITaskInfo)=>{
    debugger
    await window.checkSdk.dao.taskDao.unFinishTask(taskInfo.id);
    this.reloadDb();
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
    let records:IRecord = window.checkSdk.dao.taskRecordDao.db;
    let tongjiDao = window.checkSdk.dao.tongjiDao;

    let group = groupBy(records,(record)=>record.taskId);
    let tasks:ITaskInfoExt =window.checkSdk.dao.taskDao.db.map((taskInfo:ITaskInfo)=>{
      return {...taskInfo,records:(group[taskInfo.id]||[]).length}
    });

    pageModel.commonChange('main',()=>{
      return {
        paths:"main",
        value:(main)=>{
          main.tasks =[...tasks];
          main.records =[...records];
          main.tongji.current={...tongjiDao.getDayTonji()};
          return main;
        }
      }
    });
  }
}



//create by moon https://github.com/creasy2010/moon
