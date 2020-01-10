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
import { IActorDataItemInfo, IActorInfo } from '@/pages/moon/page/typings';


interface IActorChooseP {
  onChange: ( actorItem:IActorInfo) => void;
  [name: string]: any;
}

interface IActorDataTypeChooseS {
  targetActor?: number;
  targetData?: number;
  [name: string]: any;
}

type IProps = T.IProps & IActorChooseP;
@connect(store2Props, actions)
export default class ActorChoose extends React.Component<
  Partial<IProps>,
  IActorDataTypeChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      // targetActor: 0,
    };
  }

  render() {
    let {actions: {action}, main} = this.props;
    return (
      <div>
        <Select
          style={{width: 120}}
          value={this.state.targetActor}
          onChange={actorIndex => {
            this.setState({targetActor: actorIndex});
            this.props.onChange({
              actorIndex,
              actorName:main.pageInfo.actors[actorIndex].fileName
            });
          }}
        >
          {main.pageInfo.actors.map((actorItem, index) =>
            <Select.Option key={actorItem.fileName + index} value={index}>
              {actorItem.fileName}
            </Select.Option>,
          )}
        </Select>
      </div>
    );
  }
}

