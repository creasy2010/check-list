import * as React from 'react';

import * as T from '../types';
import './component-manger.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import ComponentItem  from  './component-item';
import {Button} from "antd";

type IComponentMangerProps = T.IProps & T.IComponentMangerProps;

@connect(
  store2Props,
  actions
)
class ComponentManger extends React.Component<
  IComponentMangerProps,
  T.IComponentMangerState
> {
  constructor(props: IComponentMangerProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    let subComps = main.pageInfo.subComps.map((compItem ,index) =>
      <ComponentItem key={"ComponentItem"+index}  index ={index} compItem={compItem} action={action} />,
    );


    return (
      <div className="componentManger">
        <div>
          <Button onClick={action.componentAdd}>添加component</Button>
        </div>
        {subComps}
      </div>
    );
  }
}

export default ComponentManger as any;
