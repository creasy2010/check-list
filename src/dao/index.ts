/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
console.log('path:',__dirname);
import {BaseDao} from "./base";
import { IRecord, ITaskCate, ITaskInfo} from "../../typings/global";


export class TaskDao extends BaseDao<ITaskInfo>{
  constructor() {
    super('task');
  }

  /**
   * 完成任务;
   * @param taskId
   */
  async finishTask(taskId:string) {
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
    let taskInfo= { status:TaskStatus.init,...item} as ITaskInfo;
    super.add(taskInfo);
  }
}

export class TaskRecordDao extends BaseDao<IRecord>{
  constructor() {
    super('task-record');
  }
}

export class TaskCateDao extends BaseDao<ITaskCate>{
  constructor() {
    super('task-cate');
  }
}


export enum TaskStatus {
  init,
  doing,
  delay,
  did,
}

