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
import {Table, Divider, Tag, Input, Button, Cascader, Select} from 'antd';
import {store2Props} from '@/pages/moon/page/selectors';
import actions from '@/pages/moon/page/actions';
import * as T from '@/pages/moon/page/types';
import {ICompMethodInfo} from '@/pages/moon/page/typings';

interface ICompMethodP {
  onChange: (methodInfo: ICompMethodInfo) => void;
  methodInfo: ICompMethodInfo;
}

interface ICompMethodS {
  compIndex?: number;
  compName?: string;
  methodName?: string;
  methodIndex?: number;
}

type IProps = T.IProps & ICompMethodP;

/**
 * 选择接口方法..
 */
@connect(store2Props, actions)
export default class CompMethodChoose extends React.Component<Partial<IProps>, ICompMethodS> {
  constructor(props) {
    super(props);
    this.state = props.methodInfo||{};
  }

  render() {
    let {actions: {action}, main} = this.props;

    return (
      <div>
        <Select
          key={"compIndex"}
          style={{width: 120}}
          value={this.state.compIndex}
          onChange={this._chooseComp}
        >
          {main.pageInfo.subComps.map((comp, index) =>
            <Select.Option key={comp.fileName+index} value={index}>{comp.fileName}</Select.Option>,
          )}
        </Select>
        {this.state.compIndex >= 0
          ? <Select
             key={"methodIndex"}
              style={{width: 120}}
              value={this.state.methodIndex}
              onChange={this._chooseMethod}
            >
              {main.pageInfo.subComps[
                this.state.compIndex
              ].methods.map((methodItem, index) =>
                <Select.Option key={methodItem.name+index}  value={index}>
                  {methodItem.name}
                </Select.Option>,
              )}
            </Select>
          : null}
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
    this.setState({
      compIndex,
      compName: main.pageInfo.subComps[compIndex].fileName,
      methodName: undefined,
      methodIndex: undefined,
    });
  };

  _chooseMethod = (methodIndex: number) => {
    let {actions: {action}, main} = this.props;
    this.setState(
      {
        methodIndex,
        methodName:
          main.pageInfo.subComps[this.state.compIndex].methods[methodIndex]
            .name,
      },
      () => {
        let {compIndex, compName, methodName, methodIndex} = this.state;
        if (compIndex!==undefined && compName && methodName && methodIndex!==undefined) {
          this.props.onChange({
            compIndex,
            compName,
            methodName,
            methodIndex,
          });
        }
      },
    );
  };
}
