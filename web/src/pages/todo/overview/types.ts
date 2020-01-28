export interface IMainReducer {
  isReady: boolean;
  isLoading?: boolean;
  tasks:any[];
  showRecordModel:boolean
}

export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

export type ITaskAddProps = {};
export type ITaskAddState = {};
export type IModelRecordProps = {};
export type IModelRecordState = {
  toFinishIds:string[];
  toRecordIds:string[];
};

export type ITaskRecordProps = {};
export type ITaskRecordState = {};

export type ITaskCateProps = {};
export type ITaskCateState = {};

//create by moon https://github.com/creasy2010/moon
