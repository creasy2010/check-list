/**
 * @desc
 *
 * @使用场景
 *
 * @company
 * @Date    2019/5/30
 **/

import * as React from 'react';
import {connect} from 'react-redux';
import {Checkbox, Row, Col,Radio, Input} from 'antd';

interface IRadioChooseP {
  onChange: (value: any[]) => void;
  datas: {name: string; value: string}[];
  [name: string]: any;
}

interface IRadioChooseS {
  choosedValue:string;
  [name: string]: any;
}

type IProps = IRadioChooseP;
export default class RadioChoose extends React.Component<
  Partial<IProps>,
  IRadioChooseS
> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      choosedValue: "",
    };
  }

  render() {
    return (
      <div>
        <Radio.Group
          //@ts-ignore
          onChange={this._checkChange}>
          {
            this.props.datas.map(item=>
              <Radio key={item.value+item.name} value={item.value}>
                {item.name}
              </Radio>)
          }
        </Radio.Group>
      </div>
    );
  }

  _checkChange =(e)=>{
    console.log(e);
    this.setState({choosedValue:e.target.value});
    this.props.onChange(e.target.value);
  }
}
