import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import api from 'api';
import {redux} from  'moon-runtime';

export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: redux.util.extraPathsValue(...arguments),
      });
    },

    /**
         * 
              普通条件查询可以走,commonChange
              
         */
    async modifySearch(
      param,
      options: {
        isQuery: boolean;
        isResetPage: boolean;
      } = {isQuery: true, isResetPage: false},
    ) {
      options.isResetPage ? (param.pageNum = 0) : null;
      dispatch({type: Command.modifyRequest, payload: param});
      //修改完直接查询;
      if (options.isQuery) {
        await this.query();
      }
    },

    /**
     * 查询下一页
     */
    async nextPage() {
      let {request} = getData().main;
      request.pageNum = request.pageNum + 1;
      dispatch({type: Command.modifyRequest, payload: request});
      await this.query();
    },

    /**
     * 以当前查询条件查询
     */
    async query() {
      let {request} = getData().main;
      //TODO 接口缺失

      // let {projectVOPage:{total,list}} = await api..XXapi(

      dispatch({
        type: Command.queryResult,
        payload: {
          total: 0,
          list: [],
        },
      });
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: redux.storeContext.getReducerData('moonListMain'),
  };
}
