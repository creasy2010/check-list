import {
  ApiMethodInfo,
  EInterActType,
  IActionMethodInfo,
  IActorDataItemInfo,
  IActorEventInfo,
  ICompMethodInfo,
} from '@/pages/moon/page/typings';
import {IProps} from '@/pages/moon/page/types';
import {InteractConfig} from '@/pages/moon/page/components/features/feature-util';
import {Command} from '@/pages/goods/service-add/constant';

/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/4
 **/

// 特性相关信息;
export const FeatureInfo = {
  code: 'Logic:ActionMethod',
  name: '[逻辑]添加Action方法',
  //介绍站点
  descHref:"/images/moon/f-action.png",
  //示例图片;
  pic:"/images/moon/f-action.png",
  target:/.*/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  methodName: {
    name: '方法名称',
    interact: EInterActType.input,
  },
  actionMethod: {
    name: '目标组件',
    interact: EInterActType.actionMethodChoose,
  },

  // checkbox:{
  //   name:"checkbox测试",
  //   interact:EInterActType.checkboxChoose,
  //   datas:['aa','bb','cc'].map(item=>{return {name:item,value:item}})
  // },
  //
  //
  // radio:{
  //   name:"radio测试",
  //   interact:EInterActType.radioChoose,
  //   datas:['aa','bb','cc'].map(item=>{return {name:item,value:item}})
  // },

  events: {
    name: '关联actor事件',
    interact: EInterActType.arrayChoose,
    childrenInteract: {
      name: '',
      interact: EInterActType.actorEventChoose,
    },
  },
  apis: {
    name: '关联api',
    interact: EInterActType.arrayChoose,
    childrenInteract: {
      name: '',
      interact: EInterActType.apiMethodChoose,
    },
  },
};

interface IDialogData {
  actionMethod: IActionMethodInfo;
  events: IActorEventInfo[];
  // radio:string[];
  // checkbox:string[]
  apis: ApiMethodInfo[];
  // visibleVar:IActorDataItemInfo;
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {
  console.log(context.data);

  let {actionMethod: {methodIndex, actionIndex}} = context.data;
  await context.actions.action.commonChange(
    `main.pageInfo.actions.${actionIndex}.methods.${methodIndex}.content`,
    getContent(context.data,),
  );
  // await context.actions.action.componentMethodAdd(compIndex, {
  //   name: `_${key}Ok`,
  //   comment: `弹窗确定`,
  //   content: ``,
  //   param: ``,
  // });
  // await context.actions.action.componentMethodAdd(compIndex, {
  //   name: `_${key}Cancel`,
  //   comment: `弹窗确定`,
  //   content: ``,
  //   param: ``,
  // });
}

function getContent(data: IDialogData): string {
  let {events, apis} = data;

  //把actio关联与event关联添加起来.
  let apiStates = apis
    .map(
      apiItem =>
        `//let {} = await api.${apiItem.apiFile}.${apiItem.methodName}();`,
    )
    .join('\n');
  let eventStates = events
    .map(
      eventItem => `this.emit(Command.${eventItem.actorName}.${eventItem.eventData.name},{});
    `,
    )
    .join('\n');
  return `
  ${apiStates}
  ${eventStates}
  `;
}




//
// /**
//  * 示例方法
//  * 作用:
//  * 在action方法中关联 api引用 与dispatch event事件;
//  *
//  * 步骤:
//  * 1.选中目标action方法
//  * 2.选择关联的api 或 事件方法
//  *
//  */
// async actionExample() {
//   // let {   } = await api.petController.getList(request);
//   // let {   } = await api.petController.getList(request);
//
//   // dispatch({type: Command.queryResult,payload: {}});
//   // dispatch({type: Command.queryResult,payload: {}});
// }