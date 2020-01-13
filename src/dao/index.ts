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
import {BaseDao} from "./base";

const checkListDir = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);

type Id =string;
type TaskId = Id;
type TaskCateId = Id;

export class TaskDao extends BaseDao<ITaskInfo>{
  constructor() {
    super('task');
  }
}

export class TaskCateDao extends BaseDao<ITaskCate>{
  constructor() {
    super('task-cate');
  }
}

export class TaskRecordDao extends BaseDao<IRecord>{
  constructor() {
    super('task-record');
  }
}



export interface IRecord{
  id:Id;
  task:ITaskInfo;
}


export enum TaskStatus {
  init,
  doing,
  delay,
  did,
}

export interface ITaskCate {
  id:TaskCateId;
  name: string;
}

export interface ITaskInfo {
  id: TaskId;
  status: TaskStatus;
  type: string;
  target: string;
  pTask: TaskId;
}