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

import * as UAntdTableDsl from './u-antd-table';
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
  code: 'U:SearchList',
  name: '[Ui]:搜索列表模板',
  //介绍站点
  descHref:"/images/moon/u-search-list.png",
  //示例图片;
  pic:"/images/moon/u-search-list.png",
  target:/h5-redux/
};

export function InterActData(data:IDialogData) :{
  [key: string]: InteractConfig;
} {
  console.log('当前的配置结果为::',data);
// todo 这里要处理下基本table的内容;;

  let target ={};
  for (let interActDataKey in UAntdTableDsl.InterActData) {
    if(interActDataKey!=="targetCompMethod"){
      target[interActDataKey] = UAntdTableDsl.InterActData[interActDataKey];
    }
  }

  return {
    targetCompMethod:{
      name:"目标组件",
      interact:EInterActType.compMethodChoose
    },

    tableConfig:{
      name:"表格配置",
      interact: EInterActType.objectChoose,
      childrenInteract:target
    }
  }
}

interface IDialogData {
  targetCompMethod:ICompMethodInfo;
  tableConfig:any;
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {
  let {actions: {action}, main} = context;
  let {targetCompMethod,tableConfig} = context.data;
  //把子项的内容生成也做了...

  let _tableConfig ={...tableConfig,targetCompMethod};

  let {content,comment} = getContent(context.data);

  //做个代理;;
  let actionProxy = new Proxy(action,{
    get:(target,name)=>{
      if(name==='commonChange') {
        return (path:string,value:any)=>{
          if(path===`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.content`){
            action.commonChange(
              path
              ,content.replace('$$PlaceHolder$$',value)
            );
          }else if(path===`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.comment`){
            action.commonChange(
              path
              ,`
              ${getCommentData(path.split(","),context)} 
              ${value}
              ${comment}
              `);
          } else {
            return target[name];
          }
        }
      } else {
        return target[name];
      }
    }
  })

  let childrenContext ={main,actions:{action:actionProxy} ,data:_tableConfig} as any ;
  await UAntdTableDsl.apply(childrenContext);
  //内容是有覆盖的..
}

/**
 *
 * 获取备注信息;;
 *
 *
 **/
function getCommentData(pathArray:string[],target):string{

  let _target=target;

  for (let i = 0, iLen = pathArray.length; i < iLen; i++) {
    let key = pathArray[i];
    _target = _target[key];
  }

  return _target||"";
}

function getContent (data: IDialogData): {comment:string;content:string} {

  return {
    comment:`
     searchlist 引用第一步
     第一步添加引用;  
     
      import { Table, Popover,Button,Input,Select } from "antd";
      import {toTableProps} from "wmkit/ui-logic";
    `,
    content:
  `
    /*
    return (
    <>
       <div className="search">
          <div className="clearfix">
            <Button className="fl" type="primary" onClick={()=>location.href=""}>添加服务</Button>
            <div className="fr">
            <Select defaultValue={main.request.cate ? main.request.cate : '所有分类'}  onSelect={this._onSelect} style={{ width: 120,marginRight:20 }} >
              <Select.Option value="">所有分类</Select.Option>
              {main.categorys.map((item:ProjectCateSimpleVO)=><Option value={item.projectCateId}>{item.projectCateName}</Option>)}
            </Select>
              <Input.Search
                data-type={"projectName"}
                placeholder="请输入服务名称"
                onChange={this._change}
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <Button className="ml10" type="primary" onClick={action.query.bind(null,true)} ghost>搜索</Button>
            </div>
          </div>
        </div>
        <div className="list mt20">
        $$PlaceHolder$$
          
        </div>
    </>
    );
    */
    `}
    ;
};

/**
 * 获取引入信息;
 */
function getImportInfo (dataItem:IActorDataItemInfo):{interfaceName:string;importStatement:string}|undefined {

  let {actorData,actorIndex,dataIndex} =  dataItem;

  if(actorData.schemaType==='import') {
    return {
      interfaceName:actorData.importInfo.interfaceName,
      importStatement:`import {${actorData.importInfo.interfaceName}} from  'api/${actorData.importInfo.apiFile}'`
    }
  }else if(actorData.schemaType==='internal' || actorData.schemaType==='fromValue') {
    let {pageInfo:{actors}}  = this.props.main;
    let currentActor = actors[actorIndex];
    let currentData = actors[actorIndex].datas[dataIndex];
    let interfaceName = `I` + toUCamelize(currentActor.fileName+"-"+currentData.name);
    return {
      interfaceName,
      importStatement:`import {${interfaceName} from  '../types'`
    }
  }

  return undefined;
}
