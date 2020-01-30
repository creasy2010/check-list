import * as React from 'react';
import * as T from '../types';
import './task-add.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TodoItem} from './todo-item';
import {Button, Icon} from 'antd';
import ColorFont from './sub/color-font';

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

    let tasks = main.tasks;
    let mainFrame;
    const todos = tasks || [];

    let todoItems = todos
      .filter(item => item.status !== 3)
      .sort((a, b) => {
        return (
          (b.order || 0) +
          (b.isTop ? 1000000000000 : 0) -
          ((a.order || 0) + (a.isTop ? 1000000000000 : 0))
        );
      })
      .map(todo => {
        return (
          <TodoItem
            key={todo.id + todo.records}
            todo={todo}
            onDel={this.delItem}
            onTop={actions.action.top}
            onCancelTop={actions.action.cancelTop}
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
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <div className="taskAdd">
        <div className={'top'}>
          <div>
            <div>
              morning:
              <br />
              {main.tongji.current.morning}/{main.tongji.last.morning}
            </div>
            <div>
              afternoon:
              <br />
              {main.tongji.current.afterNoonn}/{main.tongji.last.afterNoonn}
            </div>
            <div>
              night:
              <br />
              {main.tongji.current.night}/{main.tongji.last.night}
            </div>
            <div >
              total:
              <br />
              <div className={"total"}>
                <ColorFont
                  getLv={() => {
                    if (main.tongji.current.total > 6) {
                      return 'high';
                    } else if (main.tongji.current.total > 3) {
                      return 'mid';
                    } else {
                      return 'low';
                    }
                  }}
                >
                  {main.tongji.current.total}
                </ColorFont>
                /<ColorFont
                getLv={() => {
                  if (main.tongji.current.total > 6) {
                    return 'high';
                  } else if (main.tongji.current.total > 3) {
                    return 'mid';
                  } else {
                    return 'low';
                  }
                }}>{main.tongji.last.total}</ColorFont>
              </div>
            </div>
          </div>
          <ColorFont
            getLv={() => {
              if (main.tongji.current.total > 6) {
                return 'high';
              } else if (main.tongji.current.total > 3) {
                return 'mid';
              } else {
                return 'low';
              }
            }}>
            <Icon
              className={'btn'}
              type="check"
              onClick={() => {
                pageModel.commonChange('main.showRecordModel', true);
              }}
            />
          </ColorFont>
        </div>

        <header className="header">
          <h1>todos</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="[... #tags] [=targetRecords] topic"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
          />
        </header>
        {mainFrame}
      </div>
    );
  }

  delItem = async todoItem => {
    await pageModel.actions.action.delTask(todoItem.id);
  };

  handleNewTodoKeyDown = e => {
    if (e.key === 'Enter') {
      let title = e.target.value;
      let items = title.split(/ +/);

      let tags = [],
        targetRecords;
      for (let i = 0, iLen = items.length; i < iLen; i++) {
        let item = items[i].trim();

        if (item.startsWith('#')) {
          title = title.replace(item, '');
          tags.push(item.replace('#', ''));
        }

        if (item.startsWith('=')) {
          let reg = /=([0-9]+)/gi;

          if (reg.test(item)) {
            title = title.replace(item, '');
            let [_, num] = item.match(reg);
            targetRecords = num;
          }
          targetRecords = item.replace('=', '');
        }
      }

      pageModel.actions.action.addTask({
        tags,
        targetRecords,
        title: title.trim(),
      });
    }
  };
}

//create by moon https://github.com/creasy2010/moon
