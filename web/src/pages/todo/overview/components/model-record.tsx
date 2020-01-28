
import React from 'react';
import {Modal} from  'antd';

import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import * as T from "../types";
import {TodoItem} from "./todo-item";

type IModelRecordProps = T.IAllReducerProps & T.IModelRecordProps;


@connect<Partial<IModelRecordProps>, T.IModelRecordState>(store2Props)
export default class ModelRecord extends React.Component<T.IModelRecordProps, T.IModelRecordState>{

  render(){


    debugger
    let {main} = this.props;
    if(!main.showRecordModel){
      return null;
    }

    let {actions} = pageModel;

    let tasks =  main.tasks||[] ;

    var todoItems = tasks.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          // onToggle={this.toggle.bind(this, todo)}
          // onDestroy={this.destroy.bind(this, todo)}
          // onEdit={this.edit.bind(this, todo)}
          // editing={this.state.editing === todo.id}
          // onSave={this.save.bind(this, todo)}
          // onCancel={ e => this.cancel() }
        />
      );
    });

    return ( <Modal
      title="完成一次冲锋"
      visible={main.showRecordModel}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      {todoItems}
    </Modal>);
  }

  handleCancel=()=>{
    pageModel.commonChange("main.showRecordModel",false);
  }

  handleOk=()=>{

    pageModel.commonChange("main.showRecordModel",false);
  }
}