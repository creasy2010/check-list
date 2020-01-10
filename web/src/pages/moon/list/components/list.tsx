import * as React from 'react';

import * as T from '../types';
import './list.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { Table, Popover,Button,Input,Select } from "antd";
import {toTableProps} from "kit/ui-logic";
import { IPageInfo } from '../../page/typings/index';

type IListProps = T.IProps & T.IListProps;

@connect(
  store2Props,
  actions,
)
class List extends React.Component<IListProps, T.IListState> {
  constructor(props: IListProps) {
    super(props);
  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    // 第一步添加引用;
const getContent = (record: IPageInfo, index) =>(
      <div className="opt-more">

      </div>
    );
    return (
    <div className="list">
      <div className="search">
          <div className="clearfix">
            <Button className="fl" type="primary" onClick={()=>{
              location.href ="#/moon/page";
            }}>添加页面</Button>
          </div>
        </div>
        <div className="list mt20">
          <Table {...toTableProps(main, action)}>
            <Table.Column
              title="页面路径"
              key="3"
              width={180}
              render={(text, record: IPageInfo, index) => {
                //这个还需要前端 聚合吗 ?
                return <span>{record.pagePath}</span>;
              }}
            />
      
         {/*<Table.Column*/}
              {/*title="展示/隐藏"*/}
              {/*key="4"*/}
              {/*render={(text, record:IPageInfo, index) => {*/}
                {/*return <Switch onChange={(checked, evt)=>{*/}
                {/**/}
                {/*}} checked={record.showFlag} />;*/}
              {/*}}*/}
            {/*/>*/}
            <Table.Column
              title="操作"
              key="7"
              width={180}
              render={(text, record: IPageInfo, index) => {
                return (
                  <div className="opt">
                    <Popover
                      placement="bottom"
                      content={getContent(record, index)}
                      trigger="click"
                    >
                      <a href="javascript:;" className="btn">更多</a>
                    </Popover>
                    <a
                      className="btn"
                      href={"#/moon/page?id=" + encodeURIComponent(record.pagePath)}
                    >
                      编辑
                    </a>
                  </div>
                );
              }}
            />
          </Table>
        </div>
    </div>
    );
  }
}

export default List as any;
