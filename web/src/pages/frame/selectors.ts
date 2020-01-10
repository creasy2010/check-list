import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';


//sdfsfsdfsdfs
export function store2Props({frameMain}: any): IAllReducerProps {
  return {
    main: frameMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
