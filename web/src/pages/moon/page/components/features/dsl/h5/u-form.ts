import * as Type from '@/pages/moon/page/typings';
import {IProps} from '@/pages/moon/page/types';
import {InteractConfig} from '@/pages/moon/page/components/features/feature-util';

/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/4
 **/

// 特性相关信息;
export const FeatureInfo = {
  code: 'U:Form',
  name: '[Ui]:表单模板',
  //介绍站点
  descHref:"/images/moon/u-form.jpg",
  //示例图片;
  pic:"/images/moon/u-form.jpg",
  target:/h5-redux/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  targetCompMethod:{
    name:"目标组件",
    interact:Type.EInterActType.compMethodChoose
  },
  features:{
    name:"列包含类型",
    interact:Type.EInterActType.checkboxChoose,
    datas:['input','inputNumber','imageUpload','textArea','select','cascader','DatePicker',
      'Radio','checkBox'
    ]
      .map(item=>{return {name:item,value:item}}).concat([
        {
          name:"提交按钮",
          value:"submit"
        }, {
          name:"弹窗",
          value:"modal"
        }
      ])
  },
};

interface IDialogData {
  targetCompMethod:Type.ICompMethodInfo;
  features:string[];
}

/**
 * 添加弹窗ui
 * 添加弹窗显示与否变量关联;
 * 添加确定与取消方法的处理;
 *
 * */
export async function apply(context: IProps & {data: IDialogData}) {
  let {actions: {action}, main} = context;
  let {targetCompMethod} = context.data;


  action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.content`
    ,main.pageInfo.subComps[targetCompMethod.compIndex].methods[targetCompMethod.methodIndex].content+getContent(context.data.features));

  await action.componentMethodAdd(targetCompMethod.compIndex,{
    name: "_submit",
    comment:"提交表单",
    content:`
    const { form: { validateFields },actions:{action},main} = this.props;
    validateFields(async(errors, values) => {
      if(!errors) {
        await this.props.actions.action.submit();
        return false;
      }
    });
      `,
    param: ""
  });

  await action.actionMethodAdd(0,{
    name:"submit",
    comment:"提交表单",
    content:`
      let {main: {info, mode}} = getData();
      if (info.id) {
      } else {
      }`,
    param:"",
  });
}

function getContent (features:string[]): string {

  let formItemsContent='' ;
  let allDepend= {
    wmkit:['ValidConst'],
  };

  for (let i = 0, iLen = features.length; i < iLen; i++) {
    let feature = features[i];
    let {dependencies , content}   = tplMap[feature];
    for (let depKey in dependencies) {
      if(allDepend[depKey]) {
        for (let j = 0, jLen = dependencies[depKey].length; j < jLen; j++) {
          let depItem = dependencies[depKey][j];
          if(!allDepend[depKey].includes(depItem)){
            allDepend[depKey].push(depItem);
          }
        }
      } else {
        allDepend[depKey]=dependencies[depKey];
      }
    }

    formItemsContent+=content;
  }

  let importLines = [];
  for (let moduleName in allDepend) {
    importLines.push(`import  {${allDepend[moduleName].join(',')} } from  '${moduleName}'`);
  }

  return `
/*
        //1. 引入import
        import moment from 'moment';
        ${importLines.join(';')}
        
        import {WrappedFormUtils} from "antd/lib/form/Form";
        //2. 定义formts提示
        &{
  form:WrappedFormUtils
}
        //3.render方法
       let { getFieldDecorator } = this.props.form;
       export default Form.create<any>({ name: 'pets-info' })(PetsInfo as any );
         
        
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    };
    const formItemLayoutBig = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    };
        
  return (<div className="formContent #instanceName#">
       <Form layout="horizontal">
             ${formItemsContent}
        </Form>
      </div>)
*/
`;

};


let tplMap = {
  inputNumber:{
    dependencies:{
      antd:['Form','InputNumber'],
    },
    content:`<Form.Item {...formItemLayout} label="库存">
          {getFieldDecorator('username', {
                      initialValue:main.info.projectName,
                      rules: [{ required: true, message: '请输入服务名称!' }],
                    })(
            <InputNumber min={1} max={14} value={main.info.stock} data-type="stock" onChange={this._changeStock} style={{width:160}}/>
           )}
          </Form.Item>
`,
  },
  input:{
    dependencies:{
      antd:['Form','Input'],
    },
    content:`
    <Form.Item required {...formItemLayout} label="服务名称">
          {getFieldDecorator('username', {
            initialValue:main.info.projectName,
            rules: [{ required: true, message: '请输入服务名称!' }],
          })(
            <Input data-paths={'main.info.projectName'} onChange={action.commonChange}  placeholder="请输入服务名称" />
          )}
          </Form.Item>
`,
  },
  textArea:{
    dependencies:{
      antd:['Form','Input'],
    },
    content:`<Form.Item {...formItemLayout} label="宠物特征">
            <Input.TextArea rows={3} data-paths={'main.info.petFeatures'}
             onChange={action.commonChange} value={main.info.petFeatures} 
             placeholder="" />
          </Form.Item>
    `
  },
  imageUpload:{
    dependencies:{
      antd:['Form','Input'],
      "wmui/image-upload":['ImageUpload'],
    },
    content:`
        <Form.Item {...formItemLayout} label="图片">
              <ImageUpload key={"imageUpload"} url={"//jsonplaceholder.typicode.com/posts/"}
                           images={(main.info.projectImg||"").split(",").filter(item=>!!item)}
                           onAdd={this._addImg}
                           onDel={this._delImg}
              />
          </Form.Item>`
  },
  cascader:{

  },
  Radio:{
    dependencies:{
      antd:['Form','Radio'],
    },
    content:`
    <Form.Item required {...formItemLayout} label="宠物类型">
            <Radio.Group value={main.info.petType} onChange={action.commonChange}>
              <Radio value={1} data-paths={"main.info.petType"}>狗狗</Radio>
              <Radio value={2} data-paths={"main.info.petType"}>猫咪</Radio>
            </Radio.Group>
          </Form.Item>
    `
  },
  DatePicker:{
    dependencies:{
      antd:['Form','DatePicker'],
    },
    content:`
<Form.Item {...formItemLayout} label="宠物生日">
              <DatePicker
                value={main.info.petBirthday ? moment(main.info.petBirthday, 'YYYY/MM/DD') : undefined}
                data-paths={'main.info.petBirthday'}
                onChange={action.commonChange.bind(
                  null,
                  'main.info.petBirthday'
                )}
              />
            </Form.Item>
    `
  },
  select:{
    dependencies:{
      antd:['Form','Select'],
    },
    content:`
    <Form.Item required {...formItemLayout} label="分类">
            <Select placeholder="请选择服务分类" value={main.info.projectCateId} style={{ width: 160 }}
                     onChange={action.commonChange}>
              {
                main.cates.map((item,index)=><Select.Option key={item.projectCateId+(index+"")}   data-paths={"main.info.projectCateId"} value={item.projectCateId}>{item.projectCateName}</Select.Option>)
              }
            </Select>
          </Form.Item>
    `
  },
  modal:{

  },
  checkBox:{
    dependencies:{
      antd:['Form','Checkbox'],
    },
    content:`
    <Form.Item required label="销售渠道" {...formItemLayout}>
            <Checkbox.Group
              value={main.card.distributionChannels + ""}
              style={{ width: "100%" }}
              onChange={action.commonChange.bind(
                null,
                "main.card.distributionChannels"
              )}
            >
              <Checkbox value={"1"}>门店收银</Checkbox>
              <Checkbox value={"2"}>网店销售</Checkbox>
            </Checkbox.Group>
          </Form.Item>
    `
  },
  submit:{
    dependencies:{
      antd:['Form','Button','Row','Col'],
    },
    content:`<Form.Item>
            <Row gutter={0}>
              <Col span={4} />
              <Col span={4}>
                <Button type="primary" onClick={action.submit}>
                  保存
                </Button>
              </Col>
            </Row>
          </Form.Item>
    `
  }
}
