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
import { generateInteractEle, InteractConfig } from '@/pages/moon/page/components/features/feature-util';

import './array-choose.less';

interface IActionChooseP {
  onChange: ( value:any[]) => void;
  childrenInteract:InteractConfig;
  [name: string]: any;
}

interface IActionChooseS {
  result:[],
  [name: string]: any;
}

type IProps = IActionChooseP;
export default class ActionChoose extends React.Component<
  Partial<IProps>,
  IActionChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      result:[]
    };
  }

  render() {
    let elms = this.state.result.map((item,index)=>{
      let childrenInteract=this.props.childrenInteract ;
      if(!childrenInteract.code) {
        childrenInteract.code = index+"";
      }
      return (<div className={"line"}>
        {
          generateInteractEle(this.props.childrenInteract,(value)=>{
            //@ts-ignore
            this.state.result.splice(index,1,value);
            this.props.onChange(this.state.result.filter(item=>item!=undefined));
            this.setState({
              result:this.state.result
            });
          })
        }
        <span onClick={()=>{
          this.state.result.splice(index,1);
          this.props.onChange(this.state.result.filter(item=>item!=undefined));
          this.setState({
            result:this.state.result
          });
        }}>del</span>
      </div>)

    });
    return (
      <div className={"arrayChoose"}>
        <div className={"select"}>{
          elms
        }
          <div onClick={()=>{
            let result  =this.state.result;
            //@ts-ignore
            result.push("");
            this.setState({
              result
            });
          }}>添加</div>
        </div>
      </div>
    );
  }

}

