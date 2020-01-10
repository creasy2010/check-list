import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings/index';
import produce from 'immer';

const INITIAL_STATE: IMainReducer = {
  isReady: false,
};
console.log("load");

export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const {type, payload} = action;

  let newState= produce<IMainReducer>(state, draftState => {
    switch (type) {
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
  return {... newState}
}
