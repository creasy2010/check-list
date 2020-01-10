import Store from '@/redux/store';
import {Command} from '../constant';
import {Dispatch} from 'typings';
import api from 'api';

import Action from './action';

export default (dispatch: Dispatch) => {
  const actions = {
    action: Action(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      dispatch({
        type: Command.init,
        payload: {
          //main  :{},
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
