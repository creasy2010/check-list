import * as React from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';
import Top from './components/top';
import Taps from './components/taps';
import ActorManger from './components/actor-manger';
import ActionManger from './components/action-manger';
import ComponentManger from './components/component-manger';
import {Input} from 'antd';
import { getHashParam } from 'kit/url-helper';

@connect(
  store2Props,
  actions
)
class MoonPage extends React.Component<T.IProps, any> {
  componentDidMount() {
    let param = getHashParam<{id:string;}>(location.href);
    this.props.actions.init(param);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <div className="moonPage">
        <Input
          value={main.projectPath}
          placeholder={"trade/list"}
          data-paths={`main.projectPath`}
          onChange={action.commonChange}
          addonBefore="项目根路径:"
        />

        <Input
          value={main.pageInfo.pagePath}
          placeholder={"trade/list"}
          data-paths={`main.pageInfo.pagePath`}
          onChange={action.commonChange}
          addonBefore="页面路径:"
        />
        <Top/>
        <Taps/>
        {main.context.tag==='actor'?<ActorManger/>:null}
        {main.context.tag==='action'?<ActionManger/>:null}
        {main.context.tag==='component'?<ComponentManger/>:null}

        <a href={"#/moon/list"}>返回管理列表</a>
      </div>
    );
  }
}

export default MoonPage as any;
