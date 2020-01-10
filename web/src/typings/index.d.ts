
declare const __DEV__: boolean;
declare const __ENVINFO__:any;

//根据webpack中的定义来的.
export type TEnvInfo ={
  host:string;
}

export interface AsyncResult<T> {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context: T;
  /**
   * 消息内容
   */
  message: string;
}

export interface IPageReq{
  pageNum?:number;
  pageSize?:number;
}

export interface IEsRes<T>{
  total:number;
  root:T[];
}


/** redux beg **/

export interface Action<T=any> {
  type: string;
  payload?: T;
}

export interface Dispatch {
  (action:Action) : void;
}

/** redux end **/