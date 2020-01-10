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
import {ITaskInfo} from "./task";

const checkListDir = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);

const recordPath = join(checkListDir, 'record.json');


type Id =string;



