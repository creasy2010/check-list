/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/5/30
 **/
import  * as React from 'react';
import { ApiMethodInfo } from '../../typings/index';
import {Table, Divider, Tag, Input, Button, Cascader} from 'antd';

import {getApiIndex} from "kit/moon";


let apiInfo=getApiIndex();
let cascaderData = [];
for (let controllerName in apiInfo) {
  let children = [];

  //获取一个方法下返回参数的定义
  for (let methodName in apiInfo[controllerName].methods) {
    children.push({
      value: methodName,
      label: methodName.toLowerCase()
    });
  }

  cascaderData.push({
    value: controllerName,
    label: controllerName.toLowerCase(),
    children,
  });
}


interface IApiMethodP{
  methodInfo?:ApiMethodInfo;
  onChange:(methodInfo:ApiMethodInfo|undefined)=>void;
  [name:string]:any;
}

interface IApiMethodS{
  [name:string]:any;
}

/**
 * 选择接口方法..
 */
export default class ApiMethodChoose extends React.Component<IApiMethodP,IApiMethodS> {
  static defaultProps = {
  };

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (<Cascader
        options={cascaderData}
        showSearch={true}
        defaultValue={transData(this.props.methodInfo)}
        onChange={(values, options) => {

          if (values && values.length > 0) {
            this.props.onChange({apiFile:values[0],methodName:values[1]});
          } else if (!values || values.length === 0) {
            this.props.onChange(undefined);
          }
        }}
      />
    );
  }
}


function transData(data: ApiMethodInfo): string[] {
  if (!data) return [];
  return [
    data.apiFile,
    data.methodName
  ];
}

