import * as React from 'react';
import * as T from '../types';
import './task-add.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITaskAddProps = T.IAllReducerProps & T.ITaskAddProps;

@connect<Partial<ITaskAddProps>, T.ITaskAddState>(store2Props)
export default class TaskAdd extends React.Component<
  Partial<ITaskAddProps>,
  T.ITaskAddState
> {
  constructor(props: ITaskAddProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {main} = this.props;
    let {actions} = pageModel;

    return (
      <div className="taskAdd">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
