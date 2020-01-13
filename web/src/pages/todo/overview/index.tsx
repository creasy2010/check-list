import * as React from 'react';
import {connect} from 'react-redux';
import './index.less';
import * as T from './types';
import pageModel from './actions';
import {store2Props} from './selectors';

import TaskAdd from './components/task-add';

import TaskRecord from './components/task-record';

import TaskCate from './components/task-cate';

@connect<Partial<T.IAllReducerProps>, any>(store2Props)
export default class TodoOverview extends React.Component<
  Partial<T.IAllReducerProps>,
  any
> {
  componentDidMount() {
    pageModel.init();
  }

  componentWillUnmount() {
    pageModel.clean();
  }

  render() {
    let {main} = this.props;
    let {actions} = pageModel;

    return (
      <div id="todoOverview" className="todoOverview">
        <TaskAdd/>
        <TaskCate/>
        <TaskRecord/>
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
