/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/2/4
 **/

import {taskDao} from '../task-dao';
it('should 存储更新', function () {
  debugger;
  let filterTask  = taskDao.db[0];

  taskDao.topTask(filterTask.id);
  debugger;
  let [first ] = taskDao.db;
});