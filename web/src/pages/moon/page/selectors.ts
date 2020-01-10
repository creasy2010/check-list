import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

export function store2Props({moonPageMain}: any): IAllReducerProps {
  return {
    main: moonPageMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
