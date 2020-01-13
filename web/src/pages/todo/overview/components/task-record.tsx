import * as React from 'react';
import * as T from '../types';
import './task-record.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITaskRecordProps = T.IAllReducerProps & T.ITaskRecordProps;

@connect<Partial<ITaskRecordProps>, T.ITaskRecordState>(store2Props)
export default class TaskRecord extends React.Component<
  Partial<ITaskRecordProps>,
  T.ITaskRecordState
> {
  constructor(props: ITaskRecordProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {main} = this.props;
    let {actions} = pageModel;

    return (
      <div className="taskRecord">
        <div />
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
