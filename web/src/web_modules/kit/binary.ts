/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/4/30
 **/


/**
 * 一个整数,以二进制拆分为数组;
 */
export function binary2Array(num:number):number[] {

  let subs = num.toString(2).split("");

  let result =[];
  let total = subs.length;
  for (let i = 0, iLen = subs.length; i < iLen; i++) {
    let sub = parseInt(subs[i]);
    result.push(sub*Math.pow(2,total-i-1));
  }

  return result;
}