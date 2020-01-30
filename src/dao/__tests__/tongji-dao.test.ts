/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/
import {tongjiDao} from  '../tongji-dao';

it('should 取昨天统计数据', function () {
  console.log(tongjiDao.getDayTonji(new Date(-1)))
});