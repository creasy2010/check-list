import React from  'react';
import classNames from  'classnames';
import "./color-font.less"

export interface IProps{
    getLv:()=>"high"|"mid"|"low"
}


export default function (props:IProps) {
  let lv="high";
  if(props) {
    lv =props.getLv();
  }

  return (<div className={
    classNames({
      colorFont:true,
      high:lv==='high',
      mid:lv==='mid',
      low:lv==='low',
    })
    }>
    {props.children}
  </div>)
}