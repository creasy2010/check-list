import {Command} from '../constant';
import {Dispatch} from '@/typings';
import {IAllReducerProps} from '../types';
import {redux} from  'moon-runtime';
export default (dispatch: Dispatch) => {
  let subAction = {};
  return subAction;
};

function getData(): IAllReducerProps {
  return {
    main: redux.storeContext.getReducerData('frameMain'),
  };
}
