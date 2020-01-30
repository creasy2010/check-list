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
  console.log(tongjiDao.getDayTonji())
  console.log(tongjiDao.getDayTonji(-1))
});

it('should 添加当天一条记录', function () {
  console.log(tongjiDao.addOneRecord())
  console.log(tongjiDao.getDayTonji())
}); 