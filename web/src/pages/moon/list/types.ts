import Actions from './actions';
import { IPageInfo } from '@/pages/moon/page/typings/index';

export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;

  request: IMainRequest;

  total: IMainTotal;

  list: IPageInfo[];
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type IListProps = {};
export type IListState = {};

export interface IMainRequest {
  q?: string;
  pageNum?: number;
  pageSize?: number;
  [k: string]: any;
}
export type IMainTotal = number;
export type IMainListSet = IPageInfo[];
