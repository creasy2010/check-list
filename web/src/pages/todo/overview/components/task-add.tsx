import * as React from 'react';
import * as T from '../types';
import './task-add.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TodoItem} from './todo-item';
import {Button} from  'antd';

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

    let tasks =  main.tasks;
    let mainFrame;
    const todos = tasks||[];

    var todoItems = todos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDel={this.delItem}
          // onToggle={this.toggle.bind(this, todo)}
          // onDestroy={this.destroy.bind(this, todo)}
          // onEdit={this.edit.bind(this, todo)}
          // editing={this.state.editing === todo.id}
          // onSave={this.save.bind(this, todo)}
          // onCancel={ e => this.cancel() }
        />
      );
    });

    if (todos.length) {
      mainFrame = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            // onChange={ e => this.toggleAll(e) }
            // checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div className="taskAdd">
        <Button type="primary" onClick={()=>{
          pageModel.commonChange("main.showRecordModel",true);
        }}>添加记录</Button>
        <header className="header">
          <h1>todos</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
          />
        </header>
        {mainFrame}
      </div>
    );
  }


  delItem=async (todoItem)=>{
    debugger;
   await pageModel.actions.action.delTask(todoItem.id);
  }

  handleNewTodoKeyDown=(e)=>{
    if(e.key ==='Enter') {
      debugger;
      pageModel.actions.action.addTask(e.target.value);

    }
  }


}

//create by moon https://github.com/creasy2010/moon
