/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
import {init} from 'json-local-db';
init(".check-list");
export {taskDao} from './task-dao'
export {tongjiDao} from './tongji-dao'
export {taskCateDao} from './task-cate-dao'
export {taskRecordDao} from './task-record-dao'


export enum TaskStatus {
  init,
  doing,
  delay,
  did,
}

