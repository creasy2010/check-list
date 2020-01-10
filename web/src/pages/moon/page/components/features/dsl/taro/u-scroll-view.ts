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
  code: 'U:ScrollView',
  name: '[Ui]:下拉列表',
  //介绍站点
  descHref:"/images/moon/ui-taro-scrollview.png",
  //示例图片;
  pic:"/images/moon/ui-taro-scrollview.png",
  target:/taro-redux/
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


  action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.content`
    ,main.pageInfo.subComps[targetCompMethod.compIndex].methods[targetCompMethod.methodIndex].content+getContent(context.data.features));

  action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.comment`
    ,main.pageInfo.subComps[targetCompMethod.compIndex].methods[targetCompMethod.methodIndex].comment+
  `
import { ScrollView } from '@tarojs/components'
//https://nervjs.github.io/taro/docs/components/viewContainer/scroll-view.html
`);



  await context.actions.action.componentMethodAdd(targetCompMethod.compIndex, {
    name: `_onScrollToUpper`,
    comment: `滚动到顶部/左边，会触发 scrolltoupper 事件`,
    content: ` console.log(e.detail)`,
    param: `e`,
  });
  await context.actions.action.componentMethodAdd(targetCompMethod.compIndex, {
    name: `_onScrollToLower`,
    comment: `滚动到顶部/左边，会触发 scrolltoupper 事件`,
    content: ` console.log(e.detail)`,
    param: `e`,
  }); await context.actions.action.componentMethodAdd(targetCompMethod.compIndex, {
    name: `_onScroll`,
    comment: `滚动时触发`,
    content: `let {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY} =   e.detail`,
    param: `e`,
  });
}

//TODO 这里要完善完善..  commange 添加 . 2. page 查询直接添加起来.
function getContent (): string {

  return `
  const scrollStyle = {
      height: '150px'
    }
    const scrollTop = 0
    const Threshold = 20
   
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={this._onScrollToUpper}
        onScrollToLower={this._onScrollToLower}
        onScroll={this._onScroll}
      >
        <View >A</View>
        <View >B</View>
        <View >C</View>
      </ScrollView>
    )
`;

};