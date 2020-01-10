/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/5/9
 **/
import * as React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * 使用实例
 *
 <CountDown count={60} onCounting={(count)=>{
                    return count+"秒";
                  }}>
 获取短信验证码
 </CountDown>
 */
interface ICountDownP {
  count: number;
  onClick: (e) => boolean;
  onCounting: (count: number) => React.Component | string | number;
  [name: string]: any;
}

interface ICountDownS {
  isDoing: boolean;
  count: number;
  [name: string]: any;
}

export default class CountDown extends React.Component<
  ICountDownP,
  ICountDownS
> {
  static defaultProps = {};
  static propTypes = {};

  state = {
    //准备发送阶段;
    isDoing: false,
    //倒计时阶段;
    count: 0,
  };

  render() {
    let {children, onCounting} = this.props;
    return (
      <div onClick={this._click}>
        {this.state.count > 0
          ? (onCounting && onCounting(this.state.count)) ||
              <div style={{color:"gray"}}>{this.state.count}</div>
          : children}
      </div>
    );
  }

  _click = async e => {
    try {
      if (this.state.count === 0) {
        if (this.state.isDoing) {
          return;
        }
        //准备发送阶段
        this.setState({isDoing: true});

        try {
          let result =   await this.props.onClick(e);
          if(typeof result ==='boolean' && !result) {
            this.setState({isDoing:false});
            return ;
          }
        } catch (err) {
          this.setState({isDoing:false});
          return ;
        }

        //倒计时阶段;
        this.setState({count: this.props.count,isDoing:false}, () => {
          let _t = setInterval(() => {
            if (this.state.count === 0) {
              clearInterval(_t);
            } else {
              this.setState({count: this.state.count - 1});
            }
          }, 1000);
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
}
