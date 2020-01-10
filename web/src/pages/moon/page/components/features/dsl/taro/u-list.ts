import {
  ApiMethodInfo,
  EInterActType,
  IActionMethodInfo,
  IActorDataItemInfo,
  IActorEventInfo,
  ICompMethodInfo,
} from '@/pages/moon/page/typings';
import {IProps} from '@/pages/moon/page/types';
import {InteractConfig} from '@/pages/moon/page/components/features/feature-util';
import {Command} from '@/pages/goods/service-add/constant';
import { toUCamelize } from '@/pages/moon/page/util/string-util';

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
  code: 'U:List',
  name: '[Ui]:列表',
  //介绍站点
  descHref:"/images/moon/ui-taro-list.png",
  //示例图片;
  pic:"/images/moon/ui-taro-list.png",
  target:/taro-redux/
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  targetCompMethod:{
    name:"目标组件",
    interact:EInterActType.compMethodChoose
  },
  features:{
    name:"包含类型",
    interact:EInterActType.checkboxChoose,
    datas:[
      'title','titleLink','titleFull','imageLink','switch'
    ]
      .map(item=>{return {name:item,value:item}})
  },
};

interface IDialogData {
  targetCompMethod:ICompMethodInfo;
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

  action.commonChange(`main.pageInfo.subComps.${targetCompMethod.compIndex}.methods.${targetCompMethod.methodIndex}.comment`
    ,main.pageInfo.subComps[targetCompMethod.compIndex].methods[targetCompMethod.methodIndex].comment+
  `
import { AtList, AtListItem } from "taro-ui"
`);

}
// 'title','titleLink','titleFull','imageLink','switch'

function getContent (features:string[]): string {

  return `return (
  <AtList>
  ${features.includes("title")?`
    <AtListItem title='标题文字'  onClick={(e)=>console.log(0)} />
  `:""}
  
${features.includes("titleLink")?`
    <AtListItem title='标题文字' arrow='right'  onClick={(e)=>console.log(0)} />
  `:""} 

${features.includes("titleFull")?`
 <AtListItem
    arrow='right'
    note='描述信息'
    title='标题文字标题文字标题文字标题文字标题文字'
    extraText='详细信息详细信息详细信息详细信息'
  />
  `:""}

${features.includes("switch")?`
   <AtListItem
    title='标题文字'
    isSwitch
    onSwitchChange={(e)=>console.log(11)}
  />
  `:""}
</AtList>
  )
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
