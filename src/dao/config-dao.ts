/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/
import {JsonBaseDao} from "./json-base";
import {IConfig} from "../../typings/global";

class ConfigDao extends JsonBaseDao<IConfig> {

  constructor() {
    super("config11", {
     uri:""
    });
  }

}

export const configDao = new ConfigDao();