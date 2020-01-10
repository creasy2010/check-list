import * as React from "react";
import { Button, Modal, Input } from "antd";

interface IProps {
  name: string;
  fmt: string;
  onOK: (name: string) => void;
  onClose: (evt: any) => void;
}

export default class RenameDialog extends React.Component<IProps, any> {
  renameRef: any;
  constructor(props: any) {
    super(props);
    this.renameRef = React.createRef();
    let { name, fmt } = this.props;
    this.state = {
      name: name.replace("." + fmt, ""),
      isShow: true
    };
  }

  render() {
    return (
      <Modal
        title="重命名"
        visible={true}
        footer={null}
        onCancel={this._handleClose}
      >
        <Input
          style={{ height: 79, fontSize: "22.5px", marginBottom: 34 }}
          size="large"
          ref={this.renameRef}
          onChange={this._changeFileName}
          defaultValue={this.state.name}
          placeholder="请输入文件名,不超过40个字"
        />
        <div className="auto-footer">
          <Button
            type="primary"
            onClick={this._handleOk}
            style={{ width: 200, height: 56, marginRight: 50 }}
          >
            确定
          </Button>
          <Button
            onClick={this._handleClose}
            style={{ width: 200, height: 56 }}
          >
            取消
          </Button>
        </div>
      </Modal>
    );
  }

  _changeFileName = (e: any) => {
    this.setState({ name: e.currentTarget.value });
  };

  _handleOk = () => {
    this.props.onOK(this.state.name + "." + this.props.fmt);
    this.setState({ isShow: false });
  };

  _handleClose = (evt: any) => {
    this.setState({ isShow: false });
    this.props.onClose && this.props.onClose(evt);
  };
}
