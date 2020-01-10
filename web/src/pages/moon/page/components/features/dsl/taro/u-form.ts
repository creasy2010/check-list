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
  code: 'U:Form',
  name: '[Ui]:表单模板',
  //介绍站点
  descHref:"/images/moon/u-form.jpg",
  //示例图片;
  pic:"/images/moon/u-form.jpg",
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
    name:"列包含类型",
    interact:EInterActType.checkboxChoose,
    datas:['input','checkbox','button','picker','pickerView','radio','slider',
      'switch','textArea'
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

  await action.componentMethodAdd(targetCompMethod.compIndex,{
    name: "_submit",
    comment:"提交表单",
    content:`
      `,
    param: "e"
  });
  await action.componentMethodAdd(targetCompMethod.compIndex,{
    name: "_reset",
    comment:"提交表单",
    content:`
      `,
    param: "e"
  });
  //
  // await action.actionMethodAdd(0,{
  //   name:"submit",
  //   comment:"提交表单",
  //   content:`
  //     let {main: {info, mode}} = getData();
  //     if (info.id) {
  //     } else {
  //     }`,
  //   param:"",
  // });
}

function getContent (features:string[]): string {

  let formItemsContent='' ;
  let allDepend= {
    wmkit:['ValidConst'],
  };

  for (let i = 0, iLen = features.length; i < iLen; i++) {
    let feature = features[i];
    if(!tplMap[feature]){
      continue;
    }
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
        ${importLines.join(';')}
         
        
  return (<Form onSubmit={this._submit} onReset={this._reset} >
          ${formItemsContent}
      </Form>)
*/
`;

};

let tplMap = {
  input:{
    dependencies:{
      "@tarojs/components":['Input'],
    },
    content:`<Input type='text'
 data-paths="main.info.test"
 value={main.info.test}
 onChange={action.commonChange}
 placeholder='最大输入长度为10'
 maxLength='10'/>
`,
  },
  checkbox:{
    dependencies:{
      "@tarojs/components":['Checkbox'],
    },
    content:` 
 <Checkbox value='选中' checked={main.info.test}
 data-paths="main.info.test"
 onChange={action.commonChange}>选中</Checkbox>
`,
  },
  checkboxGroup:{
    dependencies:{
      "@tarojs/components":['Checkbox','CheckboxGroup'],
    },
    content:`
<CheckboxGroup 
   value = {main.info.test}
   onChange={action.commonChange}>
   <Checkbox value='选中' checked={main.info.test}
   data-paths="main.info.test">选中</Checkbox>
</CheckboxGroup>
`,
  },

  button:{
    dependencies:{
      "@tarojs/components":['Button'],
    },
    content:`
        <Button size='mini' type='primary'>按钮</Button>
    `
  },
  //
  // imageUpload:{
  // },

// 'input','checkbox','button','picker','pickerView','radio','slider',
//   'switch','textArea'

  // cascader:{
  //
  // },
  radio:{
    dependencies:{
      "@tarojs/components":['Radio','RadioGroup'],
    },
    content:`<RadioGroup onChange={action.commonChange}>
                {[].map((item, i) => {
                  return (
                    <Label className='radio-list__label' for={i} key={i}>
                      <Radio className='radio-list__radio' value={item.value} data-paths="main.info.test" checked={item.checked}>{item.text}</Radio>
                    </Label>
                  )
                })}
              </RadioGroup>
    `
  },
  slider:{
    dependencies:{
      "@tarojs/components":['Slider'],
    },
    content:`<Slider step={1} value={100} data-paths="main.info.test" onChange={action.commonChange} showValue min={50} max={200}/>
    `
  },
  textArea:{
    dependencies:{
      "@tarojs/components":['Text','Textarea'],
    },
    content:`
        <Text value={main.info.test} data-paths="main.info.test" onInput={action.commonChange} ></Text>
        <Textarea style='background:#fff;width:100%;min-height:80px;padding:0 30rpx;' autoHeight/>
    `
  },
  switch:{
    dependencies:{
      "@tarojs/components":['Switch'],
    },
    content:`
     <Switch data-paths="main.info.test" onChange={action.commonChange} checked/>
    `
  }
}
