
import {ITaskCate} from "../../typings/global";
import {ArrayBase} from 'json-local-db';
/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/

class TaskCateDao extends ArrayBase<ITaskCate>{
  constructor() {
    super('task-cate');
  }
}

export const taskCateDao =  new TaskCateDao();

