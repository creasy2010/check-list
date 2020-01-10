import * as React from 'react';

import * as T from '../types';
import './component-item.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { Input,Button,Table, Divider, Tag  } from 'antd';

import {IMethodDef} from "@/pages/moon/page/typings/index";
import { IActorEvent } from '@/pages/moon/page/typings';
class ComponentItem extends React.Component<
  T.IComponentItemProps,
  T.IComponentItemState
> {
  constructor(props: T.IComponentItemProps) {
    super(props);
  }

  render() {

    let {compItem,action,index} = this.props;

    return (
      <div className="componentItem">
        <div className="hbox">
          <div>
            <Input addonBefore="key" value={compItem.fileName}
                   data-paths={`main.pageInfo.subComps.${index}.fileName`}
                   onChange ={action.commonChange} />
          </div>
          <div>
            <Button onClick={action.componentDel.bind(null,index)}>删除</Button>
            <Button onClick={action.componentMethodAdd.bind(null,index,null)}>添加方法</Button>
          </div>
        </div>

        <Table key={"compMethod"}  dataSource={compItem.methods||[]} pagination={false} >
          <Table.Column
            title= '方法名'
            key= 'name'
            render = {(text, record:IMethodDef,_index:number) => {
              return (
                <Input value={record.name} placeholder={"变量名"}
                       data-paths={`main.pageInfo.subComps.${index}.methods.${_index}.name`}
                       onChange ={action.commonChange} />
              );
            }
            }
          /> <Table.Column
          title= '参数'
          key= 'param'
          render = {(text, record:IMethodDef,_index:number) => (
            <Input value={record.param} placeholder={"参数"}
                   data-paths={`main.pageInfo.subComps.${index}.methods.${_index}.param`}
                   onChange ={action.commonChange} />
          )
          }
        /> <Table.Column
          title= '内容'
          key= 'content'
          render = {(text, record:IMethodDef,_index:number) => (
            <Input value={record.content} placeholder={"方法内容"}
                   data-paths={`main.pageInfo.subComps.${index}.methods.${_index}.content`}
                   onChange ={action.commonChange} />
          )
          }
        />
          <Table.Column
            title= '注释'
            key= 'comment'
            render = {(text, record:IMethodDef,_index:number) => (
              <Input value={record.comment}
                     data-paths={`main.pageInfo.subComps.${index}.methods.${_index}.comment`}
                     onChange ={action.commonChange} />
            )
            }
          />
          <Table.Column
            title= '操作'
            key= 'action'
            render = {(text, record:IMethodDef,_index:number) => (
              <span>
                <a href="javascript:;" onClick={action.componentMethodDel.bind(null,index,_index)}>删除</a>
                <Divider type="vertical" />
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default ComponentItem as any;
