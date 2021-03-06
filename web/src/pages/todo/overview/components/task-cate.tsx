import * as React from 'react';
import * as T from '../types';
import './task-cate.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ITaskCateProps = T.IAllReducerProps & T.ITaskCateProps;

@connect<Partial<ITaskCateProps>, T.ITaskCateState>(store2Props)
export default class TaskCate extends React.Component<
  Partial<ITaskCateProps>,
  T.ITaskCateState
> {
  constructor(props: ITaskCateProps) {
    super(props);
  }

  /**

*/
  render() {
    let {main} = this.props;
    let {actions} = pageModel;

    // let cates = window.checkSdk.dao.taskCateDao.db;
    let cates = [];

    return (
      <div className="taskCate">
        <h2>分类列表</h2>
        {cates.map(cateItem=>{
          return <div>{cateItem.name}</div>
        })}
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
