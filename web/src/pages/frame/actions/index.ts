import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from '@/typings';

import Main from './main';
import {getAuthInfo, getStoreInfo} from "service/auth";

export default (dispatch: Dispatch) => {
  const actions = {
    main: Main(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      let  {employeeName,phone} =  getAuthInfo();
      let  {logo,storeName} =  getStoreInfo();

      dispatch({
        type: Command.init,
        payload: {
          main  :{
            componyInfo:{
              storeName,storeLogo:logo
            },
            personalInfo:{
              name:employeeName,phone
            }
          },
        },
      });
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({type: Command.clean});
    },
  };

  return {actions};
};
