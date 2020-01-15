import * as React from 'react';
import * as T from '../types';
import './task-add.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TodoItem} from './todo-item';

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
    // let tasks = window.checkSdk.dao.taskDao.db;

    let tasks=[{
      id:"123123",
      title:'teststst',
    },{
      id:"1231233423",
        title:'teststst11',
      }
    ]
    let mainFrame;
    const todos = tasks;


    // var shownTodos = todos.filter((todo) => {
    //   switch (this.state.nowShowing) {
    //     case ACTIVE_TODOS:
    //       return !todo.completed;
    //     case COMPLETED_TODOS:
    //       return todo.completed;
    //     default:
    //       return true;
    //   }
    // });


    var todoItems = todos.map((todo) => {
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

    //
    // var activeTodoCount = todos.reduce(function (accum, todo) {
    //   return todo.completed ? accum : accum + 1;
    // }, 0);
    //
    // var completedCount = todos.length - activeTodoCount;
    //
    // if (activeTodoCount || completedCount) {
    //   footer =
    //     <TodoFooter
    //       count={activeTodoCount}
    //       completedCount={completedCount}
    //       nowShowing={this.state.nowShowing}
    //       onClearCompleted={ e=> this.clearCompleted() }
    //     />;
    // }



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
        <header className="header">
          <h1>todos</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={ e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
          />
        </header>
        {mainFrame}
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
