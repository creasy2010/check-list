/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/1/15
 **/

import * as classNames from 'classnames';
import * as React from 'react';
import './todo-item.less'
import {Icon} from "antd";
import {ENTER_KEY, ESCAPE_KEY} from './constants';

export interface ITodoItem{
  //状态
  completed:boolean;
  top:boolean;
  //title
  title:string;
  [key:string]:any;
}

export interface ITodoItemProps{
  model?:"view"|"edit";

  //不否可以被选中
  editable?:boolean;
  //是否选中状态
  isSelected?:boolean;
  onDel?:(todoItem:ITodoItem)=>void;
  onTop?:(Item:ITodoItem)=>void;
  onCancelTop?:(Item:ITodoItem)=>void;
  onSelect?:(todoItem:ITodoItem,selected:boolean)=>void;
  onComplete?:(todoItem:ITodoItem)=>void;
  todo:ITodoItem;
}

export interface ITodoItemState{
  editText:string;
  model:"view"|"edit";
  selected:boolean;//是否是选中状态;
  todo:ITodoItem,
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  public state: ITodoItemState;

  constructor(props: ITodoItemProps) {
    super(props);

    this.state = {
      model:this.props.model||"view",
      editText: this.props.todo.title,
      selected: this.props.isSelected||false,
      todo:props.todo
    };
  }

  componentWillReceiveProps(nextProps: Readonly<ITodoItemProps>, nextContext: any): void {

    if(nextProps.todo.records !==this.props.todo.records || nextProps.todo.isTop !==this.props.todo.isTop
    ){
      debugger;
      this.setState({
        todo:{...this.state.todo,records:nextProps.todo.records,isTop:nextProps.todo.isTop}
      })
    }
  }

  public render() {
    let {model}  =this.props;

    let todo =this.state.todo;
    return (
      <div className={classNames({
        todoItem:true,
        selected:this.state.selected
        })} >
        <li
          className={classNames({
            completed: todo.status===3,
            editing: model==='edit',
          })}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.status===3}
              onChange={this.toggleComplete}
            />
            <label onClick={this.toggleSelect} onDoubleClick={this.handleEdit}>
              {`[${todo.records}/${todo.targetRecords|| "3"}] - ${todo.title}`}
            </label>
            <div className={"btns"}>
              <div className={"hoverBtns"}>
                <Icon type="close" onClick={this.del} />
                {todo.isTop?null:
                  <Icon className={"top"} onClick={this.onTop} type="pushpin" />}
              </div>
              <div className={"fixBtns"}>
                {todo.isTop?<Icon className={"topCancel"} onClick={this.onCancelTop} type="pushpin" />:
                  null}
              </div>
            </div>
          </div>
          <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onBlur={e => this.handleSubmit(e)}
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKeyDown(e)}
          />
        </li>
      </div>
    );
  }

  private onTop=()=>{
    this.props.onTop &&this.props.onTop(this.props.todo);
  }

  private onCancelTop=()=>{
    this.props.onCancelTop &&this.props.onCancelTop(this.props.todo);
  }

  private del=()=>{
    this.props.onDel && this.props.onDel(this.props.todo);
  }

  private toggleComplete=(e)=>{
    let checked = e.target.checked;
    let status  = checked?3:0;
    let todo =this.state.todo;
    this.setState({todo:{...todo,status}},()=>{
      this.props.onComplete && this.props.onComplete(this.props.todo,checked);
    });
  }


  /**
   * 切换选中状态;
   */
  private toggleSelect=()=>{
    this.setState({selected:!this.state.selected},()=>{
      this.props.onSelect && this.props.onSelect(this.props.todo,this.state.selected);
    });
  }


  public handleSubmit(event: React.FormEvent) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    if(this.props.editable) {
      this.props.onEdit && this.props.onEdit();
      this.setState({editText: this.props.todo.title});
    }
  }

  public handleKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(event);
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  public handleChange(event: React.FormEvent) {
    var input: any = event.target;
    this.setState({editText: input.value});
  }
}

export {TodoItem};
