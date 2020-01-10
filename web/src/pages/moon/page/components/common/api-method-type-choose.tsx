/**
 * @desc
 *
 * @使用场景
 *
 * @company
 * @Date    2019/5/30
 **/

import  * as React from 'react';
import {Table, Divider, Tag, Input, Button, Cascader} from 'antd';
import { ImportInfo } from '../../typings/index';

import {getApiIndex} from "kit/moon";


let apiInfo=getApiIndex();
let cascaderData = [];
for (let controllerName in apiInfo) {
  let children = [];

  //获取一个方法下返回参数的定义
  for (let methodName in apiInfo[controllerName].methods) {
    children.push({
      value: methodName,
      label: methodName.toLowerCase(),
      children: apiInfo[controllerName].methods[
        methodName
        ].responseTs.map(item => {
        return {value: item, label: item};
      }),
    });
  }

  cascaderData.push({
    value: controllerName,
    label: controllerName.toLowerCase(),
    children,
  });
}


interface IApiMethodTypeP{
  onChange:(importInfo:ImportInfo|undefined)=>void;
  [name:string]:any;
}

interface IApiMethodTypeS{
  [name:string]:any;
}

export default class ApiMethodTypeChoose extends React.Component<IApiMethodTypeP,IApiMethodTypeS> {
  static defaultProps = {

  };

  constructor(props){
    super(props);
    this.state = {
    };
  }


  render() {
    return (<Cascader
        options={cascaderData}
        showSearch={true}
        defaultValue={transData(this.props.importInfo)}
        onChange={(values, options) => {
          if (values && values.length > 0) {
            this.props.onChange({
              apiFile:values[0],
              methodName:values[1],
              interfaceName:values[2]?values[2].replace("[]",''):"",
              isArray:values[2]?values[2].endsWith("[]"):false
            });
          } else if (!values || values.length === 0) {
            this.props.onChange(undefined);
          }
        }}
      />
    );
  }
}


function transData(data: ImportInfo): string[] {
  if (!data) return [];
  return [
    data.apiFile,
    data.methodName,
    data.interfaceName + (data.isArray ? '[]' : ''),
  ];
}

