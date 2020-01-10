type HashUrl=string;



export function getHashParam<T>(search:HashUrl):T{
  let entrys = search.replace(/.*\?/,"").split('&');

  let result :any = {};

  entrys.forEach(item=>{

    let [key,value]=item.split('=');

    result[key]= decodeURIComponent(value);

  })
  return result;
}