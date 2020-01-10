import * as React from 'react';
import { Tabs } from 'antd';

import * as T from '../types';
import './taps.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITapsProps = T.IProps & T.ITapsProps;

const TabPane = Tabs.TabPane;

@connect(
  store2Props,
  actions
)
class Taps extends React.Component<ITapsProps, T.ITapsState> {
  constructor(props: ITapsProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <div className="taps">
        <Tabs activeKey={main.context.tag} onChange={action.commonChange.bind(null,"main.context.tag")}>
          <TabPane tab="actor" key="actor"></TabPane>
          <TabPane tab="action" key="action"></TabPane>
          <TabPane tab="component" key="component"></TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Taps as any;
