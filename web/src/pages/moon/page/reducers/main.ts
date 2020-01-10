import {Command} from '../constant';
import _ from 'lodash';
import {IMainReducer} from '../types';
import {Action} from 'typings/index';
import produce from 'immer';
import {immerUtil} from  'moon-runtime';
import {getMoonContext} from "kit/moon";


const INITIAL_STATE: IMainReducer = {
  isReady: false,
  projectPath:getMoonContext().pwd ||  '/Users/dong/wanmi/sbc/sbc-supplier',
  pageInfo: {
    pagePath:"",
    actors: [
      {
        fileName: 'main',
        datas: [
        ],
        events: [
        ],
      },
    ],
    actions: [
      {
        fileName: 'action',
        methods: [
        ],
      },
    ],
    subComps: [
      {
        "fileName": "info",
        "methods": [
          {
            "name": "render",
            "comment": "",
            "content": "",
            "param": ""
          }
        ]
      }
    ],
    //TODO ui 层面的编辑后面也要补上来..
    lifeCycles:{
      init:{
        name:"init",
        param:"",
        content:"",
      },
      clean:{
        name:"clean",
        param:"",
        content:"",
      },
    },
    mainComp:{
      methods:[]
    }
  },

  currentFeature: null,

  context: {tag: 'actor'},//action actor  component
};

export default function main(
  state = INITIAL_STATE,
  action: Action,
): IMainReducer {
  const {type, payload} = action;

  return produce<IMainReducer>(state, draftState => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, {...payload, key: 'main'});

      case Command.actorAdd:
        //TODO 参数类型.. 考虑定义ts了. 不然后面还是有问题 .
        //@ts-ignore
        draftState.pageInfo.actors = draftState.pageInfo.actors.concat(
          param2Array(
            payload || {
              fileName: 'actor',
              datas: [],
              events: [],
            },
          ),
        );

        return draftState;

      //
      case Command.actorSubAdd:
        draftState.pageInfo.actors[payload.index][payload.type].push(
          payload.item||defaultValue[payload.type]);

        return draftState;

      case Command.actorSubDel:
        draftState.pageInfo.actors[payload.index][payload.type].splice(payload.ItemIndex,1);

        return draftState;

      case Command.actionDel:
        draftState.pageInfo.actions.splice(payload,1);
        return draftState;

      case Command.actorDel:
        draftState.pageInfo.actors.splice(payload,1);
        return draftState;

      case Command.componentDel:
        draftState.pageInfo.subComps.splice(payload,1);
        return draftState;

      case Command.actionAdd:

        //@ts-ignore
        draftState.pageInfo.actions = draftState.pageInfo.actions.concat(
          param2Array(
            payload || {
              fileName: 'action',
              methods: []
            },
          ),
        );
        return draftState;

      //
      case Command.actionMethodDel:
        draftState.pageInfo.actions[payload.index].methods.splice(payload.itemIndex,1);
        return draftState;
      case Command.actionMethodAdd:
        draftState.pageInfo.actions[payload.index].methods.push(
          payload.item||{
          "name": "",
          "comment":"",
          "content":"",
          "param": ""
        });

        return draftState;

      case Command.componentAdd:

        draftState.pageInfo.subComps = draftState.pageInfo.subComps.concat(
          param2Array(
            payload ||  {
              "fileName": "info",
              "methods": [{
                "name": "render",
                "comment":"",
                "content":"",
                "param": ""
              }]
            },
          ),
        );
        return draftState;

      case Command.componentMethodDel:
        draftState.pageInfo.subComps[payload.index].methods.splice(payload.itemIndex,1);
        return draftState;

      case Command.componentMethodAdd:
        draftState.pageInfo.subComps[payload.index].methods.push(
          payload.item||{
            name: "",
            comment:"",
            content:"",
            param: ""
          }
          );

        return draftState;

      //初始化
      case Command.init:
        draftState.isReady = true;
        for (let propKey in payload.main) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = payload.main[propKey];
        }
        return draftState;

      //重置
      case Command.clean:
        for (let propKey in INITIAL_STATE) {
          //@ts-ignore 这里处理的不够好.
          draftState[propKey] = INITIAL_STATE[propKey];
        }
        return draftState;
    }
  });
}

function param2Array<T>(payload): T[] {
  if (payload instanceof Array) {
    return payload;
  } else {
    return [payload];
  }
}


let defaultValue = {
  datas:{
    name:"",
    schemaType:"fromValue",
    value:""
  },
  events:{
    name: "",
    comment:"",
    param: ""
  }
}