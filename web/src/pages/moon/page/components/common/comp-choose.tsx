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
import {Table, Divider, Tag, Input, Button, Cascader, Select} from 'antd';
import {store2Props} from '@/pages/moon/page/selectors';
import actions from '@/pages/moon/page/actions';
import * as T from '@/pages/moon/page/types';
import { ICompInfo } from '@/pages/moon/page/typings';

interface ICompMethodP {
  onChange: (methodInfo: ICompInfo) => void;
  compInfo?: ICompInfo;
}

interface ICompMethodS {
  compIndex?: number;
  compName?: string;
}

type IProps = T.IProps & ICompMethodP;

/**
 * 选择接口方法..
 */
@connect(store2Props, actions)
export default class CompMethodChoose extends React.Component<Partial<IProps>, ICompMethodS> {
  constructor(props) {
    super(props);
    this.state = props.compInfo||{};
  }

  render() {
    let {actions: {action}, main} = this.props;

    return (
      <div>
        <Select
          style={{width: 120}}
          value={this.state.compIndex}
          onChange={this._chooseComp}
        >
          {main.pageInfo.subComps.map((comp, index) =>
            <Select.Option value={index}>{comp.fileName}</Select.Option>,
          )}
        </Select>
      </div>
    );
  }

  /**
   * 选择组件;
   * @param {number} value
   * @private
   */
  _chooseComp = (compIndex: number) => {
    let {actions: {action}, main} = this.props;
    let compName = main.pageInfo.subComps[compIndex].fileName;
    this.setState({
      compIndex,
      compName,
    });

    this.props.onChange({
      compIndex,
      compName,
    });
  };
}
