/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/5/30
 **/

import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Select,Switch} from 'antd';
import actions from '@/pages/moon/page/actions';
import {store2Props} from '@/pages/moon/page/selectors';
import * as T from '@/pages/moon/page/types';
import { generateInteractEle, InteractConfig } from '@/pages/moon/page/components/features/feature-util';


interface IObjectChooseP {
  onChange: ( result:object) => void;
  childrenInteract:{
    [key: string]: InteractConfig;
  };
  [name: string]: any;
}

interface IObjectChooseS {
  data:{
    [name: string]: any;
  };
  [name: string]: any;
}

type IProps = T.IProps & IObjectChooseP;
@connect(store2Props, actions)
export default class ObjectChoose extends React.Component<
  Partial<IProps>,
  IObjectChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    let {actions: {action}, main} = this.props;
    return (
      <div className={"objectChoose"}>
        {this.getInterEle()}
      </div>
    );
  }


  getInterEle=()=>{

    let elems = [];
    for (let actData in this.props.childrenInteract) {
      elems.push(generateInteractEle(this.props.childrenInteract[actData],(value)=>{
        this.setState({data:{
            ...this.state.data,[actData]:value
          }},()=>{
          this.props.onChange(this.state.data);
        })
      }));
    }
    return elems;
  }
}

