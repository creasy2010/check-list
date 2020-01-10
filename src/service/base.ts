import {join} from 'path';

/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/10
 **/
const baseDir: string = join(
  process.env.HOME || process.env.USERPROFILE,
  '.check-list',
);

export class BaseService {
  fileLoc: string;

  constructor(key: string) {
    this.fileLoc = join(baseDir, key);
  }
}
