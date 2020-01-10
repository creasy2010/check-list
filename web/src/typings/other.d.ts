/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/3/5
 **/

//TODO 从reducer中获取的值,每一个推导出其类型是什么. 要尝试下.
// import reducers from  '../redux/reducers';
import goodsAddMain from "@/pages/goods/add/reducers/main";
//https://docs.sentry.io/clients/javascript/usage/#raven-js-reporting-errors

//TODO 要测试下, 打包有没有把排除.
//异步加载的reducer
type reducers = {
  goodsAddMain:  ReturnType< typeof goodsAddMain>
};

type IAllReducerDataType =  Partial< reducers>;

interface IRavenOption{
  fingerprint?:string[];
  logger?:string;
  extra:{
    [key:string]:any;
  };
}
interface IContextOption{
  email: string;
  id: string;
  [name:string]:string;
}

interface IMessageOption{
  level:"info"|"warning"|"error";
}

interface IParam{
  [name:string]:string;
}

interface IBreadcrumb{
  message:string;
  category:string;
}

//https://docs.sentry.io/clients/javascript/usage/#raven-js-reporting-errors
interface IRaven {
  captureException:(err:any,option?:IRavenOption)=>void;
  captureBreadcrumb:(param:IBreadcrumb)=>void;
  setUserContext:(option:IContextOption)=>void;
  setExtraContext:(option:IParam)=>void;
  setTagsContext:(tagsContext?:IParam)=>void;
  lastEventId:()=>string;
  showReportDialog:()=>void;
  captureMessage:(message:string,option?:IMessageOption)=>void;
}

//定义全局的__DEV__

declare const WxLogin:any;

declare const SockJS:any;

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any;

declare const Raven:IRaven;

declare const Stomp:any;