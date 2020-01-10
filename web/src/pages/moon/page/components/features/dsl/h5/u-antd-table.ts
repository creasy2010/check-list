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
  code: 'U:AntdTable',
  name: '[Ui]:antd-Table',
  //介绍站点
  descHref:"/images/moon/u-antd-table.png",
  //示例图片;
  pic:"/images/moon/u-antd-table.png",
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
  features:{
    name:"列包含类型",
    interact:EInterActType.checkboxChoose,
    datas:['switch','image','select','input']
      .map(item=>{return {name:item,value:item}})
  },
  dataType:{
    name:"列对应数据结构",
    interact:EInterActType.actorDataChoose
  },
  isSelection:{
    name:"列选择",
    interact:EInterActType.booleanChoose
  }
};

interface IDialogData {
  targetCompMethod:ICompMethodInfo;
  dataType:IActorDataItemInfo;
  features:string[];
  isSelection:{
    checked:boolean;
    value?:any
  }
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 **/
export async function apply(context: IProps & {data: IDialogData}) {
  let {actions: {action}, main} = context;
  let {targetCompMethod,isSelection} = context.data;

  let content = getContent(context);
  let {interfaceName}= getImportInfo(context.data.dataType,main.pageInfo);

  await action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.content`,content.content);
  await action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.comment`,content.comment);

  if(isSelection.checked) {
    //添加三个方法.
    await action.componentMethodAdd(targetCompMethod.compIndex,{
      name: "_getselectedRowIndex",
      comment:"获取选中的行索引数值. 可以跨页面记录的.",
      content:`
    let choosedKeys = Object.keys(this.state.chooseItems);
    let choosedKey = [];
    for (let i = 0, iLen = this.props.main.list.length; i < iLen; i++) {
      let projectItem = this.props.main.list[i];
      if (choosedKeys.includes(projectItem.projectId)) {
        choosedKey.push(i);
      }
    }

    return choosedKey;
  `,
      param: "",
      returnType:"number[]"
    })
  }
}

function getContent (context: IProps & {data: IDialogData}): {comment:string;content:string} {
  let {data,main} = context;
  let features = data.features;
  let importInfo   = getImportInfo(data.dataType,main.pageInfo);
  let interfaceName ="",importStr ="";
  if(importInfo){
    importStr = importInfo.importStatement;
    interfaceName=importInfo.interfaceName;
  }

  return {
    comment: `
    table引入指南: 
  入类
import { Table, Popover,Button,Input,Select } from "antd";
import * as uiLogic from "wmkit/ui-logic";
 ${importStr}
${data.isSelection.checked ?`
定义state初始内容及类型;
this.state={chooseItems:[]} chooseItems: ${interfaceName}[];`:""}
`,
    content:`
    const getContent = (record: ${interfaceName}, index) =>(
      <div className="opt-more">
         <a href="javascript:;" data-id={record.projectId} data-index={index} data-status={record.addedFlag} onClick={action.toggleStatus}>{record.addedFlag===0?"上架":"下架"}</a>
         <a href={"#/goods/services-add?id="+record.projectId}>详情</a>
      </div>
    );
    <Table {...uiLogic.toTableProps(main, action)}
     ${data.isSelection.checked ?`
     rowSelection={uiLogic.getRowSelectionOption<${interfaceName}>({
            rowKey: 'projectId',
            dataSource: main.list,
            selectedItems:this.state.chooseItems,
            onChange:(chooseItems)=>this.setState({chooseItems})
          })}
          `:''}
    >
            <Table.Column
              title="分类"
              key="3"
              width={180}
              render={(text, record: ${interfaceName}, index) => {
                return <span>{record.projectCateName}</span>;
              }}
            />
            
             ${features.includes('switch') ? `<Table.Column
              title="展示/隐藏"
              key="4"
              render={(text, record:${interfaceName}, index) => {
                return <Switch onChange={(checked, evt)=>{
                }} checked={record.showFlag} />;
              }}
            />`: ''}
             
           ${features.includes('image') ? `<Table.Column
              title="宠物信息"
              key="1"
              width={180}
              render={(text, record: ${interfaceName}, index) => {
                return (<img
                  className="mr10"
                  width="50"
                  height="50"
                  src={""}
                />)
              }}
            />`: ''}
          ${features.includes('select') ? `<Table.Column
              title="宠物信息"
              key="1"
              width={180}
              render={(text, record: ${interfaceName}, index) => {
                return (<Select
                  placeholder="请选择一个角色"
                  style={{width: 160}}
                  onChange={action.commonChange}
                >
                  {main.roles.map((roleItem:any, index) =>
                    <Select.Option
                      key={roleItem.roleId}
                      data-paths={'main.info.roleId'}
                      value={roleItem.roleId}
                    >
                      {roleItem.roleName}
                    </Select.Option>
                  )}
                </Select>)
              }}
            />`: ''}
            
      ${features.includes('input') ? `<Table.Column
              title="宠物信息"
              key="1"
              width={180}
              render={(text, record: ${interfaceName}, index) => {
                return (
                <Input
                value={record.name}
                data-paths=\`main.info.list.\${index}.value\`
                onChange={action.commonChange}
                
                placeholder=""
                style={{ width: 200 }}
              />)
              }}
            />`: ''}
            <Table.Column
              title="操作"
              key="7"
              width={180}
              render={(text, record: ${interfaceName}, index) => {
                return (
                  <div className="opt">
                    <Popover
                      placement="bottom"
                      content={getContent(record, index)}
                      trigger="click"
                    >
                      <a href="javascript:;" className="btn">更多</a>
                    </Popover>
                    <a
                      className="btn"
                      href={'#/goods/service-add?id=' + record.projectId}
                    >
                      编辑
                    </a>
                  </div>
                );
              }}
            />
          </Table>

    `
  };
};


/**
 * 获取引入信息;
 */
function getImportInfo (dataItem:IActorDataItemInfo,pageInfo):{interfaceName:string;importStatement:string}|undefined {

  let {actorData,actorIndex,dataIndex} =  dataItem;

  if(actorData.schemaType==='import') {
    return {
      interfaceName:actorData.importInfo.interfaceName,
      importStatement:`import {${actorData.importInfo.interfaceName}} from  'api/${actorData.importInfo.apiFile}'`
    }
  }else if(actorData.schemaType==='internal' || actorData.schemaType==='fromValue') {
    let {actors}  = pageInfo;
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