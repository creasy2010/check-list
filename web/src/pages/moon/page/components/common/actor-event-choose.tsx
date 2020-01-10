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
import { IActorDataItemInfo, IActorEventInfo } from '@/pages/moon/page/typings';


interface IActorEventChooseP {
  onChange: ( actorDataItem:IActorEventInfo) => void;
  [name: string]: any;
}

interface IActorEventChooseS {
  targetActor?: number;
  targetEvent?: number;
  [name: string]: any;
}

type IProps = T.IProps & IActorEventChooseP;
@connect(store2Props, actions)
export default class ActorEventChoose extends React.Component<
  Partial<IProps>,
  IActorEventChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
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
          value={this.state.targetEvent}
          onChange={eventIndex => {
            this.setState({targetEvent: eventIndex});

            let actor =main.pageInfo.actors[this.state.targetActor];

            let eventData = actor.events[eventIndex];
              this.props.onChange({
                eventData,
                actorIndex:this.state.targetActor,
                actorName:actor.fileName,
                eventIndex
              });
          }}
        >
          {this.state.targetActor >= 0
            ? main.pageInfo.actors[this.state.targetActor].events
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

