/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/5/8
 **/
export function  saveSession(key:string, value:string){
  return sessionStorage.setItem(key, value)
}

export function  getSession(key:string){
  return sessionStorage.getItem(key);
}

export function  delSession(key:string) {
  return sessionStorage.removeItem(key);
}

export function  clearSession(key:string) {
  return sessionStorage.clear();
}

export function  saveSessionJson<T>(key:string, value:T){
  return saveSession(key,JSON.stringify(value));
}

export function  getSessionJson<T>(key:string):T{
  return JSON.parse(getSession(key));
}

export function  saveLocal(key:string, value:string){
  return localStorage.setItem(key, value)
}

export function  getLocal(key:string){
  return localStorage.getItem(key);
}

export function  delLocal(key:string) {
  return localStorage.removeItem(key);
}

export function  clearLocal(key:string) {
  return localStorage.clear();
}

export function  saveLocalJson<T>(key:string, value:T){
  return saveLocal(key,JSON.stringify(value));
}

export function  getLocalJson<T>(key:string):T{
  try{
    return JSON.parse(getLocal(key));
  } catch (err) {
    return {} as  any ;
  }
}