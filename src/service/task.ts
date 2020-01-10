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

let taskRepo: ITaskInfo[];
let taskCateRepo: ITaskCate[];

const checkListDir = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);
const taskInfoPath = join(checkListDir, 'task.json');
const taskCatePath = join(checkListDir, 'task-cate.json');

type Id =string;
type TaskId = Id;
type TaskCateId = Id;


/**
 * 添加任务;
 * @param ITaskInfo
 */
export async function addTask(taskInfo:ITaskInfo) {
  taskRepo.push(taskInfo);
}


/**
 * 添加任务
 * @param taskCate
 */
export async function addTaskCate(taskCate:ITaskCate) {
  taskCateRepo.push(taskCate);
}


/**
 * 加载任务分类
 */
export function loadTaskCate(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (existsSync(taskCatePath)) {
      taskCateRepo = await readJSON(taskCatePath);
      resolve();
    } else {
      taskCateRepo = [];
    }
  });
}

/**
 * 加载任务;
 */
function loadTask(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (existsSync(taskInfoPath)) {
      taskRepo = await readJSON(taskInfoPath);
      resolve();
    } else {
      taskRepo = [];
    }
  });
}

(async()=>{
  await loadTask();
  await loadTaskCate();
})();



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