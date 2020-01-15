export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  tasks:any[];
}

export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

export type ITaskAddProps = {};
export type ITaskAddState = {};

export type ITaskRecordProps = {};
export type ITaskRecordState = {};

export type ITaskCateProps = {};
export type ITaskCateState = {};

//create by moon https://github.com/creasy2010/moon
