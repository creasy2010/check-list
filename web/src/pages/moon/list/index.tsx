import * as React from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import actions from './actions';
import {store2Props} from './selectors';

import List from './components/list';

@connect(
  store2Props,
  actions,
)
class MoonList extends React.Component<T.IProps, any> {
  componentDidMount() {
    this.props.actions.init();
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
      <div className="moonList">
        <List />
      </div>
    );
  }
}

export default MoonList as any;
