import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;

export type ILeftMenuProps = {};
export type ILeftMenuState = {
  activeIndex:number;
};

export type IConponeyInfoProps = {};
export type IConponeyInfoState = {
  visible?:boolean;
  userInfo?:boolean;
  confirmLoading?:boolean;
};

export type IPersonalInfoProps = {};
export type IPersonalInfoState = {};

export interface IMainMenuList {
  menuName?: string;
  image?: string;
  url?: string;
  sub?: {
    menuName?: string;
    url?: string;
    sub?: {
      menuName: string;
      url: string;
      [k: string]: any;
    }[];
    [k: string]: any;
  }[];
  [k: string]: any;
}[]
export interface IMainComponyInfo {
  logo?: string;
  storeName?:string;
  storeLogo?:string;
  time?: string;
  tag1?: string;
  tag2?: string;
  [k: string]: any;
}
export interface IMainPersonalInfo {
  name?: string;
  phone?: string;
  headPoint?: string;
  [k: string]: any;
}
