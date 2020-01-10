import * as React from 'react';

import * as T from '../types';
import './actor-manger.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {Button} from "antd";
import ActorItem from './actor-item';
import { Table, Divider, Tag } from 'antd';
type IActorMangerProps = T.IProps & T.IActorMangerProps;

@connect(store2Props, actions)
class ActorManger extends React.Component<
  IActorMangerProps,
  T.IActorMangerState
> {
  constructor(props: IActorMangerProps) {
    super(props);
  }

  render() {
    let {actions: {action}, main} = this.props;

    let actors = main.pageInfo.actors.map((actorItem ,index) =>
      <ActorItem key={"actor"+index} index ={index} actorItem={actorItem} action={action} />,
    );

    return (
      <div className="actorManger">
        <div>
          <Button onClick={action.actorAdd}>添加actor</Button>
        </div>

        {actors}
      </div>
    );
  }
}

export default ActorManger as any;
