import {IProps} from '@/pages/moon/page/types';
import {InteractConfig} from '@/pages/moon/page/components/features/feature-util';
import {layout as layoutCore} from 'layout-algorithm';
import {h5Generator,rnGenerator} from 'moon-ui-generate';
import {IGeneResult} from "../../../../../../../../../ui-generate/declarations/html5";

// 特性相关信息;
export const FeatureInfo = {
  code: 'UI:sketch',
  name: 'sketch-auto-ui',
  //介绍站点
  descHref: '',
  //示例图片;@imgcook/dsl-helper
  pic: '将sketch页面信息接入到项目中来',
  target: /redux/,
};

//特性需要用户输入数据;
export const InterActData: {
  [key: string]: InteractConfig;
} = {
  moduleId: {
    interact: 'input',
    name: 'output',
    code: 'output',
  },
};

//这里正在做...
interface IData {
  moduleId: string;
  [name: string]: any;
}

/**
 *
 * */
export async function apply(context: IProps & {data: IData}) {
  let {
    actions: {action},
    main: {pageInfo},
  } = context;
  let {moduleId = '/Users/dong/Falcon/sketch-to-code/temp'} = context.data;

  moduleId =moduleId.trim();
  let api = window.moon.api;
  let layoutJson = api.fsExtra.readJSONSync(moduleId + '/origin.json');
  let nodeInfoJson = api.fsExtra.readJSONSync(moduleId + '/extraInfo.json');
  let node = layoutCore(layoutJson,nodeInfoJson);
  let uiRes:IGeneResult;
  if (window.moon.context.moonConfig.type === 'h5-redux') {
    //图片copy
    await api.fsExtra.copy(
      moduleId + '/img',
      window.moon.context.pwd + '/src/resources/images/' + pageInfo.pagePath,
    );

    uiRes = h5Generator(node, {
      isDebug: false,
      resourceMap: url => {
        return api.path
          .join('@/resources/images/' + pageInfo.pagePath, url)
          .replace('/img/', '/');
      },
    });

  } else if (window.moon.context.moonConfig.type === 'rn-redux') {
    //图片copy
    await api.fsExtra.copy(
      moduleId + '/img',
      window.moon.context.pwd + '/src/resources/images/' + pageInfo.pagePath,
    );

    uiRes = rnGenerator(node, {
      isDebug: false,
      resourceMap: url => {
        return api.path
          .join('@/resources/images/' + pageInfo.pagePath, url)
          .replace('/img/', '/');
      },
    });

  } else if (window.moon.context.moonConfig.type === 'taro-redux') {
    throw new Error('尙未对接taro-redux');
  }else{
    throw new Error('尙未对接'+window.moon.context.moonConfig.type);
  }

  //
  // 生成子组件
  uiRes.subComps.forEach(async (uiComp, idx) => {
    await action.componentAdd();
    let index = pageInfo.subComps.length + idx;
    action.commonChange(
      `main.pageInfo.subComps.${index}.imports`,
      uiComp.imports,
    );
    action.commonChange(`main.pageInfo.subComps.${index}.style`, uiComp.style);
    action.commonChange(
      `main.pageInfo.subComps.${index}.fileName`,
      uiComp.componentName,
    );
    action.commonChange(
      `main.pageInfo.subComps.${index}.methods.0.content`,
      `return (${uiComp.vdom})`,
    );
  });

  // 填充主组件
  const methodIndex = pageInfo.mainComp.methods.findIndex(
    m => m.name === 'render',
  );
  if (methodIndex === -1) {
    pageInfo.mainComp.methods.push({
      name: 'render',
      content:  `return (${uiRes.mainComp.vdom})` ,
    });
    action.commonChange(
      `main.pageInfo.mainComp.methods`,
      pageInfo.mainComp.methods,
    );
  } else {
    action.commonChange(
      `main.pageInfo.mainComp.methods.${methodIndex}.content`,
      `return (${uiRes.mainComp.vdom})`,
    );
  }
  action.commonChange(`main.pageInfo.mainComp.imports`, uiRes.mainComp.imports);
  action.commonChange(`main.pageInfo.mainComp.style`, uiRes.mainComp.style);
}
