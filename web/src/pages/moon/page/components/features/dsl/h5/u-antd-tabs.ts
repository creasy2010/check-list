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
import { toUCamelize } from '@/pages/moon/page/util/string-util';

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
  code: 'U:AntdTabs',
  name: '[Ui]:tabs切换',
  //介绍站点
  descHref:"/images/moon/u-antd-tabs.png",
  //示例图片;
  pic:"/images/moon/u-antd-tabs.png",
  target:/h5-redux/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  targetCompMethod:{
    name:"目标组件",
    interact:EInterActType.compMethodChoose
  },
};

interface IDialogData {
  targetCompMethod:ICompMethodInfo;
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {
  let {actions: {action}, main} = context;
  let {targetCompMethod} = context.data;
  action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.content`,getContent());

}

function getContent (): string {

  return `
   // import { Tabs } from "antd";
    <Tabs activeKey={main.request.type} type="card"
    onChange={action.commonChange.bind(null,"main.request.type")}>
          <Tabs.TabPane tab="员工管理" key="1">
            <div >111</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="角色管理" key="2">
            <div >222</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="已禁用账号" key="3">
            <div >333</div>
          </Tabs.TabPane>
        </Tabs>
    `;
};