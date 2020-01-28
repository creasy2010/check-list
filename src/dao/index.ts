/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
import { readJSON, existsSync} from 'fs-extra';
import {join} from 'path';
import {BaseDao, IBase} from "./base";

type Id =string;
type TaskId = Id;
type TaskCateId = Id;

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
  public add=async (item:Partial<ITaskInfo>)=>{
    let taskInfo= { id:Date.now()+"", status:TaskStatus.init,...item} as ITaskInfo;
    await super.add(taskInfo);
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


export interface IRecord extends IBase{
  id:Id;
  taskId:Id;
  //备注;
  comment?:string;
}


export enum TaskStatus {
  init,
  doing,
  delay,
  did,
}

export interface ITaskCate extends IBase{
  id:TaskCateId;
  name: string;
}

export interface ITaskInfo extends IBase{
  id: TaskId;
  title: string;
  status: TaskStatus;
  tags: string;
  pTask: TaskId;
}