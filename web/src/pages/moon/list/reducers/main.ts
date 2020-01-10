import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings';
import produce from 'immer';
import {immerUtil} from  'moon-runtime';
import {getPageDb} from "kit/moon";

let db  = getPageDb();
let list =[];
for (let pagePath in db) {
  list.push(db[pagePath]);
}

const INITIAL_STATE: IMainReducer = {
  isReady: false,

  request: {q: '', pageNum: 0, pageSize: 1000000},

  total: 0,

  list,
};

export default function main(
  state = INITIAL_STATE,
  action: Action,
): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, draftState => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      //修改查询条件数据
      case Command.modifyRequest:
        immerUtil.assign(draftState.request, payload);
        return draftState;

      //清空查询结果
      case Command.cleanList:
        draftState.list = [];
        return draftState;

      //
      case Command.queryResult:
        draftState.list = payload.list;
        draftState.total = payload.total;

        return draftState;

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}
