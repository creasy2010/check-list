import React from 'react';
import {Modal} from 'antd';
import * as T from '../types';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TodoItem} from './todo-item';
type IModelRecordProps = T.IAllReducerProps & T.IModelRecordProps;

@connect<Partial<IModelRecordProps>, T.IModelRecordState>(store2Props)
export default class ModelRecord extends React.Component<
  T.IModelRecordProps,
  T.IModelRecordState
> {
  constructor() {
    super();
    this.state={
      toRecordIds:[],
      toFinishIds:[]
    }
  }
  render() {
    let {main,sortTasks} = this.props;
    if (!main.showRecordModel) {
      return null;
    }
    let {actions} = pageModel;
    var todoItems = sortTasks
      .map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSelect={this.selectItem}
          onComplete={this.completeItem}
        />
      );
    });

    return (
      <Modal
        className={"modelRecord"}
        title="完成一次冲锋"
        visible={main.showRecordModel}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <ul className={"list"}>
          {todoItems}
        </ul>
      </Modal>
    );
  }

  completeItem=(todoItem,completed:boolean)=>{
    if(completed) {
      this.setState({
        toFinishIds:this.state.toFinishIds.concat([todoItem.id])
      })
    } else {
      this.setState({
        toFinishIds:this.state.toFinishIds.filter(item=>item.id!==todoItem.id)
      })
    }
  }


  /**
   * 选中一项;
   * @param todoItem
   * @param selected
   */
  selectItem = (todoItem,selected:boolean)=>{
    if(selected) {
      this.setState({
        toRecordIds:this.state.toRecordIds.concat([todoItem.id])
      });
    } else {
      this.setState({
        toRecordIds:this.state.toRecordIds.filter(item=>item!==todoItem.id)
      });
    }
  }

  handleCancel = () => {
    pageModel.commonChange('main.showRecordModel', false);
  };

  handleOk = async () => {
   await pageModel.actions.action.submitRecord(this.state.toRecordIds,this.state.toFinishIds);
   pageModel.commonChange('main.showRecordModel', false);
   this.setState({toRecordIds:[],toFinishIds:[]})
  };
}
