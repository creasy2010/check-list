import {createSelector} from 'reselect';
import {IAllReducerProps} from './types';

/*
 WARNING: 在复杂页面使用统一store2Props,会有性能 问题, 详情,请查看;
*/
export function store2Props({TodoOverviewMain}: any): IAllReducerProps {
  return {
    main: TodoOverviewMain,
  };
}

//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
