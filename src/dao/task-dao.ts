/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/
import {BaseDao} from "./array-base";
import {outputFileSync} from 'fs-extra';
import {ITaskInfo} from "../../typings/global";
import {TaskStatus} from "./index";

class TaskDao extends BaseDao<ITaskInfo> {
  constructor() {
    super('task');
    outputFileSync('/tmp/checklist-'+Math.random(),"12312");
  }

  topTask = async (taskId: string) => {
    let taskInfo = await this.findById(taskId);
    if (taskInfo) {
      taskInfo.isTop = true;
      taskInfo.order = Date.now();
    }

    this.update(taskId, taskInfo);
  }

  cancelTopTask = async (taskId: string) => {
    let taskInfo = await this.findById(taskId);
    if (taskInfo) {
      taskInfo.isTop = false;
      taskInfo.order = Date.now()
    }

    this.update(taskId, taskInfo);
  }

  /**
   * 完成任务;
   * @param taskId
   */
  finishTask = async (taskId: string) => {
    let taskInfo = await this.findById(taskId);
    if (taskInfo) {
      taskInfo.status = TaskStatus.did;
      taskInfo.isTop = false;
    }

    this.update(taskId, {status: TaskStatus.did});
  }

  /**
   * 添加
   * @param item
   */
  public add = (item: Partial<ITaskInfo>) => {
    let taskInfo = {status: TaskStatus.init, ...item, order: Date.now()} as ITaskInfo;
    super.add(taskInfo);
  }
}

export const taskDao = new TaskDao();