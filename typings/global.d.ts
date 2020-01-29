/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/
import {IBase} from "../src/dao/base";

export type Id = string;

export type TaskId = Id;
export type TaskCateId = Id;

export interface IRecord extends IBase {
  taskId: Id;
  //备注;
  comment?: string;
}

export interface ITaskCate extends IBase {
  id: TaskCateId;
  name: string;
}

export interface ITaskInfo extends IBase {
  id: TaskId;
  title: string;
  status: TaskStatus;
  tags: string;
  pTask: TaskId;
}

