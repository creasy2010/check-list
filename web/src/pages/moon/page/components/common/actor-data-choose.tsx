/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/5/30
 **/

import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Select} from 'antd';
import actions from '@/pages/moon/page/actions';
import {store2Props} from '@/pages/moon/page/selectors';
import * as T from '@/pages/moon/page/types';
import { IActorDataItemInfo } from '@/pages/moon/page/typings';


interface IActorDataTypeChooseP {
  onChange: ( actorDataItem:IActorDataItemInfo) => void;
  [name: string]: any;
}

interface IActorDataTypeChooseS {
  targetActor?: number;
  targetData?: number;
  [name: string]: any;
}

type IProps = T.IProps & IActorDataTypeChooseP;
@connect(store2Props, actions)
export default class ActorDataChoose extends React.Component<
  Partial<IProps>,
  IActorDataTypeChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      targetActor: 0,
    };
  }

  componentDidMount() {}

  render() {
    let {actions: {action}, main} = this.props;
    return (
      <div>
        <Select
          style={{width: 120}}
          value={this.state.targetActor}
          onChange={value => this.setState({targetActor: value})}
        >
          {main.pageInfo.actors.map((actorItem, index) =>
            <Select.Option key={actorItem.fileName + index} value={index}>
              {actorItem.fileName}
            </Select.Option>,
          )}
        </Select>
        <Select
          style={{width: 120}}
          value={this.state.targetData}
          onChange={value => {
            this.setState({targetData: value});
            let actor =main.pageInfo.actors[this.state.targetActor];
            let actorInfo = actor.datas[value];
              this.props.onChange({
                actorData:actorInfo,
                actorIndex:this.state.targetActor,
                actorName:actor.fileName,
                dataIndex:value
              });
          }}
        >
          {this.state.targetActor >= 0
            ? main.pageInfo.actors[this.state.targetActor].datas
                .map((dataItem, index) =>
                  <Select.Option key={dataItem.name + index} value={index}>
                    {dataItem.name}
                  </Select.Option>,
                )
            : null}
        </Select>
      </div>
    );
  }
}

