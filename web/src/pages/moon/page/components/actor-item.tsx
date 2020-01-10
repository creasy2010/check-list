import * as React from 'react';

import * as T from '../types';
import './actor-item.less';
import {Table, Divider, Tag, Input, Button, Cascader} from 'antd';
import {IActorEvent} from '@/pages/moon/page/typings/index';
import { IActorData, IMethodDef, ImportInfo } from '@/pages/moon/page/typings';
import {getApiIndex} from "kit/moon";

let apiInfo=getApiIndex();
let cascaderData = [];
for (let controllerName in apiInfo) {
  let children = [];

  //获取一个方法下返回参数的定义
  for (let methodName in apiInfo[controllerName].methods) {
    children.push({
      value: methodName,
      label: methodName,
      children: apiInfo[controllerName].methods[
        methodName
        ].responseTs.map(item => {
        return {value: item, label: item};
      }),
    });
  }

  cascaderData.push({
    value: controllerName,
    label: controllerName,
    children,
  });
}

export default class ActorItem extends React.Component<T.IActorItemProps, T.IActorItemState> {
  constructor(props: T.IActorItemProps) {
    super(props);
  }

  render() {
    let {actorItem, action, index} = this.props;

    return (
      <div className="actorItem">
        <div className="hbox">
          <div>
            <Input
              addonBefore="key"
              value={actorItem.fileName}
              data-paths={`main.pageInfo.actors.${index}.fileName`}
              onChange={action.commonChange}
            />
          </div>
          <div>
            <Button onClick={action.actorDel.bind(null, index)}>删除</Button>
            <Button onClick={() => action.actorMethodAdd(index, 'datas')}>
              添加变量
            </Button>
            <Button onClick={() => action.actorMethodAdd(index, 'events')}>
              添加event
            </Button>
          </div>
        </div>
        <Table key={"actorData"} dataSource={actorItem.datas} pagination={false}>
          <Table.Column
            title="变量名"
            key="name"
            render={(text, record: IActorData, _: number) =>
              <Input
                value={record.name}
                data-paths={`main.pageInfo.actors.${index}.datas.${_}.name`}
                onChange={action.commonChange}
              />}
          />

          <Table.Column
            title="变量默认值"
            key="value"
            render={(text, record: IActorData, _: number) =>
              <Input
                defaultValue={JSON.stringify(record.value)}
                data-paths={`main.pageInfo.actors.${index}.datas.${_}.value`}
                onChange={this._changeValue}
                addonAfter={typeof record.value === 'object' ? 'json' : '非json'}
              />}
          />

          <Table.Column
            title="类型定义"
            key="typeDef"
            render={(text, record: IActorData, _: number) =>
              <Cascader
                showSearch={true}
                options={cascaderData}
                value={transData(record.importInfo)}
                onChange={(values, options) => {
                  if (values && values.length > 0) {
                    action.commonChange([
                      {
                        paths: `main.pageInfo.actors.${index}.datas.${_}.importInfo`,
                        value: {
                          apiFile: values[0],
                          methodName: values[1],
                          interfaceName: values[2].replace('[]', ''),
                          isArray: values[2].includes('[]'),
                        },
                      },
                      {
                        paths: `main.pageInfo.actors.${index}.datas.${_}.schemaType`,
                        value: 'import',
                      },
                    ]);
                  } else if (!values || values.length === 0) {
                    action.commonChange([
                      {
                        paths: `main.pageInfo.actors.${index}.datas.${_}.importInfo`,
                        value: undefined,
                      },
                      {
                        paths: `main.pageInfo.actors.${index}.datas.${_}.schemaType`,
                        value: 'fromValue',
                      },
                    ]);
                  }
                }}
              />}
          />

          <Table.Column
            title="操作"
            key="action"
            render={(text, record: IActorData, _: number) =>
              <span>
                <a
                  href="javascript:;"
                  onClick={action.actorMethodDel.bind(null, index, 'datas', _)}
                >
                  删除
                </a>
                <Divider type="vertical" />
              </span>}
          />
        </Table>

        <Table key={"actorEvent"}   dataSource={actorItem.events} pagination={false}>

          <Table.Column
            title="事件名"
            key="name"
            render={(text, record: IActorEvent, _: number) => {
              return (
                <Input
                  value={record.name}
                  data-paths={`main.pageInfo.actors.${index}.events.${_}.name`}
                  onChange={action.commonChange}
                />
              );
            }}
          />{' '}
          <Table.Column
            title="参数"
            key="param"
            render={(text, record: IActorEvent, _: number) =>
              <Input
                defaultValue={record.param}
                data-paths={`main.pageInfo.actors.${index}.events.${_}.param`}
                onChange={action.commonChange}
              />}
          />{' '}
          <Table.Column
            title="内容"
            key="content"
            render={(text, record: IActorEvent, _: number) =>
              <Input
                value={record.content}
                data-paths={`main.pageInfo.actors.${index}.events.${_}.content`}
                onChange={action.commonChange}
              />}
          />
          <Table.Column
            title="注释"
            key="comment"
            render={(text, record: IActorEvent, _: number) =>
              <Input
                value={record.comment}
                data-paths={`main.pageInfo.actors.${index}.events.${_}.comment`}
                onChange={action.commonChange}
              />}
          />
          <Table.Column
            title="操作"
            key="action"
            render={(text, record: IActorEvent, _: number) =>
              <span>
                <a
                  href="javascript:;"
                  onClick={action.actorMethodDel.bind(null, index, 'events', _)}
                >
                  删除
                </a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
              </span>}
          />
        </Table>
      </div>
    );
  }

  _changeValue = e => {
    this.props.action.commonChange(
      e.target.dataset.paths,
      e.target.value,
      ({paths, value}) => {
        let _val = value;
        try {
          _val = JSON.parse(value);
        } catch (e) {}

        return {paths, value: _val};
      },
    );
  };
}

function transData(data: ImportInfo): string[] {
  if (!data) return [];
  return [
    data.apiFile,
    data.methodName,
    data.interfaceName + (data.isArray ? '[]' : ''),
  ];
}


