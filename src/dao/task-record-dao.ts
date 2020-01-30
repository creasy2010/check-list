import {BaseDao} from "./array-base";
import {IRecord} from "../../typings/global";
import {tongjiDao} from "./tongji-dao";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/



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
