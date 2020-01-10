import * as React from 'react';

import * as T from '../types';
import './action-item.less';
import { Button,Input } from 'antd';
import {IMethodDef} from "@/pages/moon/page/typings/index";

import { Table, Divider, Tag } from 'antd';
import { IActorEvent } from '@/pages/moon/page/typings';

class ActionItem extends React.Component<T.IActionItemProps, T.IActionItemState> {
  constructor(props: T.IActionItemProps) {
    super(props);
  }

  render() {

    let {actionItem,action,index} = this.props;

    return (
    <div className="actionItem">
      <div className="hbox">
        <div>
          <Input addonBefore="key" value={actionItem.fileName}
                 data-paths={`main.pageInfo.actions.${index}.fileName`} onChange ={action.commonChange} />
        </div>
        <div>
          <Button onClick={action.actionDel.bind(null,index)}>删除</Button>
          <Button onClick={()=>action.actionMethodAdd(index)}>添加方法</Button>
        </div>
      </div>

      <Table key={"actionItemMethod"} dataSource={actionItem.methods} pagination={false} >
        <Table.Column
          title= '方法名'
          key= 'name'
          render = {(text, record:IMethodDef,_index:number) => {
            return (
              <Input value={record.name} placeholder={"变量名"}
                     data-paths={`main.pageInfo.actions.${index}.methods.${_index}.name`}
                     onChange ={action.commonChange} />
            );
          }
          }
        /> <Table.Column
        title= '参数'
        key= 'param'
        render = {(text, record:IMethodDef,_index:number) => (
          <Input value={record.param} placeholder={"参数"}
                 data-paths={`main.pageInfo.actions.${index}.methods.${_index}.param`}
                 onChange ={action.commonChange} />
        )
        }
      /> <Table.Column
        title= '内容'
        key= 'content'
        render = {(text, record:IMethodDef,_index:number) => (
          <Input value={record.content} placeholder={"方法内容"}
                 data-paths={`main.pageInfo.actions.${index}.methods.${_index}.content`}
                 onChange ={action.commonChange} />
        )
        }
      />
        <Table.Column
          title= '注释'
          key= 'comment'
          render = {(text, record:IMethodDef,_index:number) => (
            <Input value={record.comment} placeholder={"备注"}
                   data-paths={`main.pageInfo.actions.${index}.methods.${_index}.comment`}
                   onChange ={action.commonChange} />
          )
          }
        />
        <Table.Column
          title= '操作'
          key= 'operation'
          render = {(text, record:IMethodDef,_:number) => (
            <span>
                <a href="javascript:;" onClick={action.actionMethodDel.bind(null,index,_)}>删除</a>
                <Divider type="vertical" />
              </span>
          )}
        />
      </Table>
  </div>
);
}
}

export default ActionItem;
