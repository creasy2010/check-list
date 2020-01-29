/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
import {BaseDao} from "./array-base";
import {IRecord, ITaskCate, ITaskInfo, ITongJi, TongjiDayItem} from "../../typings/global";
import {JsonBaseDao} from "./json-base";


class TaskDao extends BaseDao<ITaskInfo>{
  constructor() {
    super('task');
  }

  topTask=async (taskId:string)=>{
    let taskInfo  =await this.findById(taskId);
    if(taskInfo) {
      taskInfo.isTop=true;
      taskInfo.order=Date.now();
    }

    this.update(taskId,taskInfo);
  }

  cancelTopTask=async (taskId:string)=>{
    let taskInfo  =await this.findById(taskId);
    if(taskInfo) {
      taskInfo.isTop=false;
      taskInfo.order=Date.now()
    }

    this.update(taskId,taskInfo);
  }

  /**
   * 完成任务;
   * @param taskId
   */
   finishTask=async (taskId:string) => {
    let taskInfo =await this.findById(taskId);
    if(taskInfo) {
      taskInfo.status =TaskStatus.did;
    }

    this.update(taskId,{status:TaskStatus.did});
  }

  /**
   * 添加
   * @param item
   */
  public add=(item:Partial<ITaskInfo>)=>{
    let taskInfo= { status:TaskStatus.init,...item,order:Date.now()} as ITaskInfo;
    super.add(taskInfo);
  }
}

export const taskDao =  new TaskDao();


 class TaskRecordDao extends BaseDao<IRecord>{
  constructor() {
    super('task-record');
  }

  add=(item: IRecord) =>{
    super.add(item);
    //添加到统计记录中去;
    tongjiDao.addOneRecord();
  }
 }


export const taskRecordDao =  new TaskRecordDao();

 class TaskCateDao extends BaseDao<ITaskCate>{
  constructor() {
    super('task-cate');
  }
}

export const taskCateDao =  new TaskCateDao();

class  TongjiDao extends JsonBaseDao<ITongJi>{

  constructor() {
    super("tongji",{
      days:{},
      months:{}
    });
  }

  getDayTonji(date:Date=new Date()):TongjiDayItem{
    let current = date;
    let key =`${current.getFullYear()}-${current.getMonth()}-${current.getDay()}`

    let tongjiday =  this.data.days[key];

    if(!tongjiday) {
      this.data.days[key] ={total:0,night:0,afterNoonn:0,morning:0};
      tongjiday =this.data.days[key];
    }
    return tongjiday;
  }

  /**
   * 记录当天的信息;
   */
  addOneRecord(){
  let current  =  new Date();
  let key =`${current.getFullYear()}-${current.getMonth()}-${current.getDay()}`
   let hour = current.getHours();
   let tarProper = "morning";
    if(hour>=12 && hour < 19) {
      tarProper="afterNoonn"
    } else if(hour>=19) {
      tarProper="night"
    }

    let tongjiday =  this.data.days[key];

    if(!tongjiday) {
      this.data.days[key] ={total:0,night:0,afterNoonn:0,morning:0};
      tongjiday =this.data.days[key];
    }

    tongjiday[tarProper] ++;
    tongjiday.total++;
    this.dump();
  }
}

export const tongjiDao =  new TongjiDao();


export enum TaskStatus {
  init,
  doing,
  delay,
  did,
}

