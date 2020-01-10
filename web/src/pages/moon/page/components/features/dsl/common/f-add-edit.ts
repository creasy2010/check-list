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
  code: 'Logic:AddEdit',
  name: '[逻辑]添加或编辑',
  //介绍站点
  descHref:"/images/moon/f-add-edit.png",
  //示例图片;
  pic:"/images/moon/f-add-edit.png",
  target:/.*/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  apis: {
    name: '关联api[option]',
    interact: EInterActType.arrayChoose,
    childrenInteract: {
      name: '',
      interact: EInterActType.apiMethodChoose,
    },
  },
};

interface IDialogData {
  apis: ApiMethodInfo[];
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {

  let {actions: {action}, main,data} = context;

  let methods =main.pageInfo.mainComp.methods;
  let componentDidMountM = methods.filter(item=>item.name==='componentDidMount')[0];
  if(componentDidMountM) {
    componentDidMountM.content = `
      //import {getHashParam} from "wmkit/url-helper";
    let param = getHashParam<{id:string;}>(location.search);
    this.props.actions.init(param);
      `}

  let apiStates = data.apis
    .map(
      apiItem =>
        `//let {} = await api.${apiItem.apiFile}.${apiItem.methodName}();`,
    )
    .join('\n');
  action.commonChange([
    {
      paths: 'main.pageInfo.lifeCycles.init',
      value: {
        param: '{id}',
        content: `
      let payload = {
        main:{
        }
      }
        ${apiStates}
       
      if(id) {
        //TODO 查询接口缺失
        // let result = await api.
        // payload.main.info=
      }
      this.emit(Command.init,payload);
    `,
      },
    },
    {
      paths:'',
      value:`
    let param = getHashParam<{id:string;}>(location.search);
    this.props.actions.init(param);
    `}
  ]);

  //关掉弹框;
  action.commonChange('main.currentFeature', '');


}