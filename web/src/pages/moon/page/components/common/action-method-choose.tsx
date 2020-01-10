/**
 * @desc
 *
 * @使用场景
 *
 * @company
 * @Date    2019/5/30
 **/

import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Select} from 'antd';
import actions from '@/pages/moon/page/actions';
import {store2Props} from '@/pages/moon/page/selectors';
import * as T from '@/pages/moon/page/types';
import { IActionInfo, IActionMethodInfo, IActorDataItemInfo, IActorInfo } from '@/pages/moon/page/typings';


interface IActionMethodChooseP {
  onChange: ( actionItem:IActionMethodInfo|undefined) => void;
  [name: string]: any;
}

interface IActionMethodChooseS {
  actionIndex?: number;
  methodIndex?: number;
  [name: string]: any;
}

type IProps = T.IProps & IActionMethodChooseP;
@connect(store2Props, actions)
export default class ActionMethodChoose extends React.Component<
  Partial<IProps>,
  IActionMethodChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      targetActor: 0,
    };
  }

  render() {
    let {actions: {action}, main} = this.props;
    return (
      <div>
        <Select
          style={{width: 120}}
          value={this.state.actionIndex}
          onChange={actionIndex => {
            this.setState({actionIndex});
          }}
        >
          {main.pageInfo.actions.map((actionItem, index) =>
            <Select.Option key={actionItem.fileName + index} value={index}>
              {actionItem.fileName}
            </Select.Option>,
          )}
        </Select>

        <Select
          style={{width: 120}}
          value={this.state.methodIndex}
          onChange={methodIndex => {
            this.setState({methodIndex});
            let actionIndex =this.state.actionIndex;
            let action =main.pageInfo.actions[actionIndex];
            let methodInfo = action.methods[methodIndex];
            this.props.onChange({
              methodInfo,
              methodIndex,
              actionIndex,
              actionName:main.pageInfo.actions[actionIndex].fileName,
            });
          }}
        >
          {this.state.actionIndex >= 0
            ? main.pageInfo.actions[this.state.actionIndex].methods
              .map((methodItem, index) =>
                <Select.Option key={methodItem.name + index} value={index}>
                  {methodItem.name}
                </Select.Option>,
              )
            : null}
        </Select>
      </div>
    );
  }
}

