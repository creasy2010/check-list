/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/
import {JsonBase} from 'json-local-db';
import {ITongJi, TongjiDayItem} from "../../typings/global";

const DAYMillSecond =24* 60*60*1000;

class TongjiDao extends JsonBase<ITongJi> {

  constructor() {
    super("tongji", {
      days: {},
      months: {}
    });
  }

  /**
   *
   * @param date
   */
  getDayTonji(date: Date|number = new Date()): TongjiDayItem {

    if(typeof date==='number') {
      date = new Date(Date.now()+date*DAYMillSecond);
    }
    let current = date;
    let key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`

    let tongjiday = this.data.days[key];

    if (!tongjiday) {
      this.data.days[key] = {total: 0, night: 0, afterNoonn: 0, morning: 0};
      tongjiday = this.data.days[key];
    }
    return tongjiday;
  }

  /**
   * 记录当天的信息;
   */
  addOneRecord() {
    let current = new Date();
    let key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
    let hour = current.getHours();
    let tarProper = "morning";
    if (hour >= 12 && hour < 19) {
      tarProper = "afterNoonn"
    } else if (hour >= 19) {
      tarProper = "night"
    }

    let tongjiday = this.data.days[key];

    if (!tongjiday) {
      this.data.days[key] = {total: 0, night: 0, afterNoonn: 0, morning: 0};
      tongjiday = this.data.days[key];
    }

    tongjiday[tarProper]++;
    tongjiday.total++;
    this.dump();
  }
}

export const tongjiDao = new TongjiDao();