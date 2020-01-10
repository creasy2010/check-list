import { EInterActType, IActorDataItemInfo, ICompMethodInfo } from '@/pages/moon/page/typings';
import { IProps } from '@/pages/moon/page/types';

/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/4
 **/

//交互类型;//

// 特性相关信息;
export const FeatureInfo = {
  code:"ui:antd-dialog",
  name:"[ui]弹窗公共逻辑",
  //介绍站点
  descHref:"/images/moon/f-dialog.jpg",
  //示例图片;
  pic:"/images/moon/f-dialog.jpg",
  target:/h5-redux/
}

//特性需要用户输入数据;
export const InterActData = {
  key:{
    name:"Key",
    interact:EInterActType.input
  },
  targetCompMethod:{
    name:"目标组件",
    interact:EInterActType.compMethodChoose
  },
  // visibleVar:{
  //   name:"显示控制变量(reducer)(option)",
  //   interact:EInterActType.actorDataChoose
  // },
}

interface IDialogData{
  targetCompMethod:ICompMethodInfo;
  // visibleVar:IActorDataItemInfo;
  key:string;
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context:IProps & {data:IDialogData}) {
  let {targetCompMethod:{methodIndex,compIndex},key} = context.data;
  await context.actions.action.commonChange(`main.pageInfo.subComps.${compIndex}.methods.${methodIndex}.content`,getContent(context.data));
  await context.actions.action.componentMethodAdd(compIndex, {
    name: `_${key}Ok`,
    comment: `弹窗确定`,
    content: ``,
    param: ``,
  });

  await context.actions.action.componentMethodAdd(compIndex, {
    name: `_${key}Cancel`,
    comment: `弹窗确定`,
    content: ``,
    param: ``,
  });
}

function getContent(data:IDialogData) {
  let {targetCompMethod:{methodIndex,compIndex},key} = data;
  // let visibleVar = data.visibleVar?`${data.visibleVar.actorName+"."+data.visibleVar.actorData.name}`:"this.state.isShow";

  return `
      //import { Modal} from 'antd';
       <Modal
          destroyOnClose
          key={'addEditCate'}
          title={"title"}
          visible={false}
          onOk={this._${key}Ok}
          onCancel={this._${key}Cancel}
          okText="确定"
          cancelText="取消"
        >
        </Modal>
  `
}
