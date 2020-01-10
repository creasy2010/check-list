import * as React from 'react';
import {Form, Upload, Icon, Modal} from 'antd';

interface IImageUploadProps {
  url: string;
  headers?:object;
  onAdd: (urL: string) => void;
  onDel: (url: string) => void;
  images?: string[];
}

interface IImageUploadState {
  previewVisible: boolean;
  previewImage: string;
  fileList?: any[];
}

export default class ImageUpload extends React.Component<
  IImageUploadProps,
  IImageUploadState
> {
  constructor(props: IImageUploadProps) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList:
        props.images.map(url => {
          return {uid: url + Math.random(), url};
        }) || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.fileList.length ===0 && this.props.images !== nextProps.images) {
      this.setState({
        fileList: nextProps.images.map(url => {
          return {
            uid: url + Math.random(),
            url,
          };
        }),
      });
    }
  }

  render() {
    let {previewVisible, previewImage, fileList} = this.state;
    return (
      <div key={'imageUploadeForm'} className="imageUploadeForm">
        <div className="clearfix">
          <Upload
            action={this.props.url}
            listType="picture-card"
            fileList={fileList}
            headers={this.props.headers}
            onPreview={this.handlePreview}
            onRemove={this.onRemove}
            onChange={this.handleChange}
          >
            {fileList.length >= 5
              ? null
              : <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{width: '100%'}} src={previewImage} />
          </Modal>
        </div>
        <div className="tips">最多可上传5张，建议尺寸 640 x 640px。</div>
      </div>
    );
  }

  onRemove = (file): boolean => {
    this.props.onDel(file.url || file.response.context.url);
    return true;
  };

  handleChange = async ({file, fileList}) => {
    if (file.status === 'done') {
      this.props.onAdd(file.response.context.url);
    }
    this.setState({fileList: fileList});
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url|| file.response.context.url,
      previewVisible: true,
    });
  };

  handleCancel = () => this.setState({previewVisible: false});
}
