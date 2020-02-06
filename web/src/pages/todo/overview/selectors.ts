import {createSelector} from 'reselect';
import {IAllReducerProps, IMainReducer} from './types';

/*
 WARNING: 在复杂页面使用统一store2Props,会有性能 问题, 详情,请查看;
*/
export function store2Props({TodoOverviewMain}: {TodoOverviewMain:IMainReducer}): IAllReducerProps {

  return {
    main: TodoOverviewMain,
    sortTasks:(TodoOverviewMain.tasks || []).filter(item=>item.status!==3)
      .sort(((a,b)=>{
        return  ((b.order||0)+(b.isTop?1000000000000:0))-((a.order||0)+(a.isTop?1000000000000:0));
      })),

    completeSortTasks:(TodoOverviewMain.tasks || []).filter(item=>item.status===3)
      .sort(((a,b)=>{
        return b.updateTime - a.updateTime ;
      })),
  };
}



//衍生数据使用请参考:  https://github.com/reduxjs/reselect
//create by moon https://github.com/creasy2010/moon
