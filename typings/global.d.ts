/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/29
 **/
import {IBase} from "json-local-db/declarations/array-base";

export type Id = string;

export type TaskId = Id;
export type TaskCateId = Id;

export interface IRecord extends IBase {
  taskId: Id;
  //备注;
  comment?: string;
}


export interface TongjiDayItem{
  morning:number;
  afterNoonn:number;
  night:number;
  total:number;
}

export interface IConfig {
  uri:string;//http or local-html
  //最后一次提交record时间;
  // lastRecordTime:number;
}

export interface ITongJi {
  days:{
    [dayOfTime:string]:TongjiDayItem;
  }
  months:{
    [monthYears:string]:any;
  };
}


export interface ITaskCate extends IBase {
  id: TaskCateId;
  name: string;
}

export interface ITaskInfo extends IBase {
  id: TaskId;
  title: string;
  tags?:string[];
  targetRecords?:number;
  status: TaskStatus;
  //排序字段; 为空时则取createtime字段值;
  order?:number;
  //是否置顶;
  isTop?:boolean;
  tags: string;
  pTask?: TaskId;
}

