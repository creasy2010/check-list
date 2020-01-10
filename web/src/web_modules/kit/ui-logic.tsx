import * as React from 'react';


/**
 * 公共转换逻辑 .
 * @param {ITableProps} main
 * @param {ITableAction} action
 * @returns {ITablePropsResult}
 */
export function toTableProps(main: ITableProps, action:ITableAction,option:any={}):ITablePropsResult{


  return {
    loading:main.isLoading||false,
    pagination:{
        pageSize:main.request.pageSize,
        total:main.total,
        hideOnSinglePage:true,
        pageSizeOptions:['20', '50', '100'],
        current: main.request.pageNum+1,
        showSizeChanger: true,
        showTotal: () => {
        return <span>共{main.total}条</span>;
      },
        onShowSizeChange: (current, pageSize) => {
        action.modifySearch({pageSize});
      },
        onChange: (pageNum, pageSize) => {
        action.modifySearch({pageNum: pageNum-1  });
      }
  },
  dataSource:main.list,
    ...option
  }
}

interface ITablePropsResult{
  loading:boolean;
  pagination:any;
  dataSource:any[];
}

interface ITableAction {
  modifySearch:(param:{
    pageSize?:number;
    pageNum?:number;
    [name:string]:any})=> void;
}

interface ITableProps {
  isLoading?:boolean;
  list:any[];
  request:{
    pageSize?:number;
    pageNum?:number;
  };
  total:number;
}