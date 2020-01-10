/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/22
 **/

const isReal=!!window.moon;
export function getPageDb(){

  if(isReal){
    return window.moon.context.pageDb
  }else{
    return {};
  }
}


export function getApiIndex(){
  if(isReal){
    return window.moon.context.apiIndex
  }else{
    return {};
  }
}


export function getProjectMoonConfig(){

  if(isReal) {
    return window.moon.context.moonConfig
  }else{
    return { type:"taro-redux"};
  }

}

export function getMoonContext(){
  if(isReal){
    return window.moon.context
  } else {
    return {
      projectName:"moon"
    };
  }

}