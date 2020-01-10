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
  code: 'Logic:Breadcrumb',
  name: '[逻辑]为入口函数添加面包屑',
  //介绍站点
  descHref:"/images/moon/f-breadcrumb.png",
  //示例图片;
  pic:"/images/moon/f-breadcrumb.png",
  target:/h5-redux/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
};

interface IDialogData {
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {
  await context.actions.action.mainCompMethodAdd({
    name:"render",
    content:`
    /*
    import { Breadcrumb } from 'antd';
    import { Headline } from 'qmkit';

     <Breadcrumb separator=">">
          <Breadcrumb.Item>客户</Breadcrumb.Item>
          <Breadcrumb.Item>客户管理</Breadcrumb.Item>
          <Breadcrumb.Item>宠物列表</Breadcrumb.Item>
          <Breadcrumb.Item>
            {this.props.main.mode === 'edit' ? '编辑宠物' : '添加宠物'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="container">
          <Headline
            title={this.props.main.mode === 'edit' ? '编辑宠物' : '添加宠物'}
          />
        </div>
    */
    `,
  });
}
