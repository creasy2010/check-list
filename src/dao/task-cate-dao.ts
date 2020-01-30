import {BaseDao} from "./array-base";
import {ITaskCate} from "../../typings/global";

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/

class TaskCateDao extends BaseDao<ITaskCate>{
  constructor() {
    super('task-cate');
  }
}

export const taskCateDao =  new TaskCateDao();

