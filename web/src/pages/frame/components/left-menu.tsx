import * as React from 'react';
import {Link, Route} from 'react-router-dom';

import * as T from '../types';
import './left-menu.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {Layout, Menu, Icon, Button} from 'antd';
const {SubMenu} = Menu;
const {Sider} = Layout;

type ILeftMenuProps = T.IProps & T.ILeftMenuProps;

@connect(store2Props, actions)
class LeftMenu extends React.Component<ILeftMenuProps, T.ILeftMenuState> {
  constructor(props: ILeftMenuProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    let {} = this.props.main;

    return (
      <div className="leftMenu" style={{}}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          onClick={({item, key, keyPath, domEvent}) => {
            let href = item.props['data-href'];
            let target = item.props['data-target']||"";
            if (href) {
              if(target ==='_blank'){
                window.open(decodeURIComponent(href))
              }else{
                location.href = decodeURIComponent(href);
              }
            }
          }}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item data-href={'#/'} key="1">
            <Icon type="profile" />
            <span>概况</span>
          </Menu.Item>
          <Menu.Item data-href={'#/moon/list'} key="11">
            <Icon type="unordered-list" />
            <span>页面列表</span>
          </Menu.Item>
          <Menu.Item data-href={'#/moon/page'} key="12">
            <Icon type="ile-add" />
            <span>添加页面</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="api" />
            <span>api接口生成</span>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="tool" />
                <span>前端工具合集</span>
              </span>
            }
          >
            <Menu.Item key="5" data-href="http://json2ts.com/" data-target="_blank">JSON2TS</Menu.Item>
            <Menu.Item key="5" data-href="https://www.json.cn/" data-target="_blank">JSON格式化</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="tool" />
                <span>xLib合集</span>
              </span>
            }
          >
            <Menu.Item key="5" data-href="#/schema/define" >模式定义</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="tool" />
                <span>backend</span>
              </span>
            }
          >
            <Menu.Item key="6" data-href="#/backend/model/list" >模型列表</Menu.Item>
            <Menu.Item key="7" data-href="#/backend/service/list" >服务列表</Menu.Item>
          </SubMenu>
        </Menu>

      </div>
    );
  }

  _clickMenu = ({item, key, keyPath}) => {
    console.log(item, key, keyPath);
    this.setState({activeIndex: key});
  };
}

export default LeftMenu as any;
