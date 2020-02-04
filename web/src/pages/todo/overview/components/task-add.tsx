import * as React from 'react';
import * as T from '../types';
import './task-add.less';
import pageModel from '../actions';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {TodoItem} from './todo-item';
import {Button, Icon,Modal} from 'antd';
import ColorFont from './sub/color-font';
import {ITaskInfo} from "../../../../../../typings/global";

type ITaskAddProps = T.IAllReducerProps & T.ITaskAddProps;

@connect<Partial<ITaskAddProps>, T.ITaskAddState>(store2Props)
export default class TaskAdd extends React.Component<
  Partial<ITaskAddProps>,
  T.ITaskAddState
> {

  inputref;
  state={};

  constructor(props: ITaskAddProps) {
    super(props);
    this.inputref= React.createRef();
  }

  /**
    
*/
  render() {
    let {main,sortTasks,completeSortTasks} = this.props;
    let {actions} = pageModel;

    let todoItems = sortTasks
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


    let completeItems = completeSortTasks
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

    let mainFrame;
    if (sortTasks.length) {
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
            ref={this.inputref}
            className="new-todo"
            placeholder="[... #tags] [=targetRecords] topic"
            onKeyDown={this.handleNewTodoKeyDown}
            autoFocus={true}
          />
          <Modal
            title="确定添加"
            visible={!!this.state.toAddTask}
            onOk={this.addTask}
            onCancel={this.cancelTask}
          >
            <p>title:{this.state.toAddTask?.title}</p>
            <p>预计:{this.state.toAddTask?.targetRecords}</p>
            <p>tags:{this.state.toAddTask?.tags}</p>
          </Modal>
        </header>
        {mainFrame}
        <div>
          <Button icon={this.state.showComplete?"down":"right"} onClick={()=>{
            this.setState({
              showComplete:!this.state.showComplete
            })
          }}>已完成</Button>
          <div style={{display:this.state.showComplete?"block":"none"}} >
            {completeItems}
          </div>
        </div>
      </div>
    );
  }

  delItem = async todoItem => {
    await pageModel.actions.action.delTask(todoItem.id);
  };


  addTask=() => {
    pageModel.actions.action.addTask(this.state.toAddTask);
    this.inputref.current.value="";
    this.inputref.current.focus();
    this.setState({toAddTask:undefined})
  }

  cancelTask=()=>{
    this.setState({toAddTask:undefined});
  }

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

      this.setState({
        toAddTask:{
          tags,
          targetRecords,
          title: title.trim(),
        }
      });

      // e.target.value=""

    }
  };
}

//create by moon https://github.com/creasy2010/moon
