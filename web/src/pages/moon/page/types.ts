import Actions from './actions';
import { IPageInfo } from '@/pages/moon/page/typings';


export interface IMainReducer {
  isReady: boolean;
  projectPath:string;
  isLoading?: boolean;
  pageInfo: IPageInfo;

  currentFeature?:string;

  context: IMainContext;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ITopProps = {};
export type ITopState = {
  isShow:boolean
};

export type ITapsProps = {};
export type ITapsState = {};

export type IActorMangerProps = {};
export type IActorMangerState = {};

export type IActorItemProps = {
  actorItem:any,
  index:number;
  action:any;
};
export type IActorItemState = {};

export type IActionMangerProps = {};
export type IActionMangerState = {
};

export type IActionItemProps = {
  actionItem:any,
  index:number;
  action:any;
};
export type IActionItemState = {};

export type IComponentMangerProps = {};
export type IComponentMangerState = {};

export type IComponentItemProps = {
  compItem:any,
  index:number;
  action:any;
};
export type IComponentItemState = {};

export interface IMainPageInfo {
  [k: string]: any;
}
export type IMainFeaturesSet = IMainFeatures[];

export interface IMainFeatures {
  [k: string]: any;
}
export interface IMainContext {
  tag?: string;
  [k: string]: any;
}
