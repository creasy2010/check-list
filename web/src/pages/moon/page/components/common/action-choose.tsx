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
import { IActionInfo, IActorDataItemInfo, IActorInfo } from '@/pages/moon/page/typings';


interface IActionChooseP {
  onChange: ( actionItem:IActionInfo|undefined) => void;
  [name: string]: any;
}

interface IActionChooseS {
  targetActor?: number;
  targetData?: number;
  [name: string]: any;
}

type IProps = T.IProps & IActionChooseP;
@connect(store2Props, actions)
export default class ActionChoose extends React.Component<
  Partial<IProps>,
  IActionChooseS
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
          value={this.state.targetAction}
          onChange={actionIndex => {
            this.setState({targetAction: actionIndex});
            this.props.onChange({
              actionIndex,
              actionName:main.pageInfo.actions[actionIndex].fileName
            });
          }}
        >
          {main.pageInfo.actions.map((actionItem, index) =>
            <Select.Option key={actionItem.fileName + index} value={index}>
              {actionItem.fileName}
            </Select.Option>,
          )}
        </Select>
      </div>
    );
  }
}

