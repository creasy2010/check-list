/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/30
 **/
import {IConfig} from "../../typings/global";

import {JsonBase} from 'json-local-db';

class ConfigDao extends JsonBase<IConfig> {

  constructor() {
    super("config11", {
     uri:""
    });
  }

}

export const configDao = new ConfigDao();