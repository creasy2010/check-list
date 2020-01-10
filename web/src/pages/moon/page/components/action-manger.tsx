import * as React from 'react';

import * as T from '../types';
import './action-manger.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

import  ActionItem from  './action-item';
import {Button,Modal} from "antd";


type IActionMangerProps = T.IProps & T.IActionMangerProps;
@connect(
  store2Props,
  actions
)
class ActionManger extends React.Component<
  IActionMangerProps,
  T.IActionMangerState
> {
  constructor(props: IActionMangerProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    let actions = main.pageInfo.actions.map((actionItem ,index) =>
      <ActionItem  key={"actions"+index}  index ={index} actionItem={actionItem} action={action} />,
    );
    
    return (
      <div className="actionManger">
        <div>
          <Button onClick={action.actionAdd}>添加action</Button>
        </div>
        {actions}
      </div>
    );
  }
}

export default ActionManger as any;
