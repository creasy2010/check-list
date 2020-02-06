
import {IRecord} from "../../typings/global";
import {tongjiDao} from "./tongji-dao";
import {ArrayBase} from 'json-local-db';

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/


class TaskRecordDao extends ArrayBase<IRecord>{
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
