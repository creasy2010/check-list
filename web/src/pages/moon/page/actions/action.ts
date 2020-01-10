import {Command} from '../constant';
import {Dispatch} from 'typings';
import {IAllReducerProps} from '../types';
import api from 'api';
import {redux} from  'moon-runtime';


export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: redux.util.extraPathsValue(...arguments),
      });
    },

    /**
     * 添加主方法;
     * @param {{name: string; comment?: string; content: string; param: string; returnType?: string}} item
     * @returns {Promise<void>}
     */
    async mainCompMethodAdd(item?:{
      comment?:string;
      name: string;
      content:string;
      param?: string;
      returnType?:string;
    }) {
      dispatch({
        type: Command.commonChange,
        payload: {
          paths:"main.pageInfo.mainComp.methods",
          value:(methods)=>methods.push(item||{
            name: "_test",
            content:"_test",
            param:"",
          })
        },
      });
    },

    /**
     *
     */
    async actorAdd() {
      dispatch({ type: Command.actorAdd });
    },

    async actorDel(index:number) {
      dispatch({ type: Command.actorDel,payload:index });
    },

    /**
     *
     */
    async actorMethodAdd(actorIndex:number,type:"datas"|"events",item?:any) {
      dispatch({ type: Command.actorSubAdd ,payload:{index:actorIndex,type,item}});
    },


    async actorMethodDel(actorIndex:number,type:"datas"|"events",ItemIndex:number) {
      dispatch({ type: Command.actorSubDel ,payload:{index:actorIndex,type,ItemIndex}});
    },
    /**
     *
     */
    async actionAdd() {
      dispatch({ type: Command.actionAdd });
    },

    async actionDel(index:number) {
      dispatch({ type: Command.actionDel ,payload:index});
    },

    /**
     *
     */
    async actionMethodAdd(actionIndex:number,item?:{
      name: string;
      comment:string;
      content:string;
      param: string;
    }) {
      dispatch({ type: Command.actionMethodAdd ,payload:{index:actionIndex,item}});
    },
    /**
     *
     */
    async actionMethodDel(actionIndex:number,itemIndex:number,item?:any) {
      dispatch({ type: Command.actionMethodDel ,payload:{index:actionIndex,itemIndex,item}});
    },

    /**
     *
     */
    async componentAdd() {
      dispatch({ type: Command.componentAdd });
    },

    async componentDel(index:number) {
      dispatch({ type: Command.componentDel, payload:index});
    },

    /**
     *
     */
    async componentMethodAdd(compIndex:number,item?:{
      name: string;
      comment?:string;
      content:string;
      param: string;
      returnType?:string;
    }) {
      dispatch({ type: Command.componentMethodAdd ,payload:{index:compIndex,item}});
    },

    async componentMethodDel(compIndex:number,itemIndex:number) {
      dispatch({ type: Command.componentMethodDel ,payload:{index:compIndex,itemIndex}});
    },
  };
  return action;
};

function getData(): IAllReducerProps {
  return {
    main: redux.storeContext.getReducerData('moonPageMain'),
  };
}
