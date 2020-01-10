/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/4/30
 **/
import { getLocalJson, saveLocalJson } from 'kit/storage';
import { StoreVO } from 'webapi/SupplierStoreController';
let token = '';

const USERINFO = 'wm-pets:userinfo';
const STOREINFO = 'wm-pets:storeInfo';

export function getToken(): string {
  if (!token) {
    let userInfo = getLocalJson(USERINFO) || {};
    token = userInfo['token'] ? userInfo['token'] : '';
  }
  return token;
}

/**
 * 获取认证信息;
 * @returns {any}
 */
export function getAuthInfo(): IAuthInfo {
  return getLocalJson(USERINFO);
}

export function updateAuthToken(newToken: string) {
  let userInfo = getLocalJson(USERINFO);
  userInfo['token'] = newToken;
  token = newToken;
  return saveLocalJson(USERINFO, userInfo);
}

export function saveAuthUserInfo(userInfo: IAuthInfo) {
  token = userInfo.token;
  return saveLocalJson(USERINFO, userInfo);
}

export function getStoreInfo(): StoreVO {
  return getLocalJson(STOREINFO);
}

export function updateStoreInfo(storeInfo: StoreVO) {
  return saveLocalJson(STOREINFO, { ...getLocalJson(STOREINFO), ...storeInfo });
}

export function saveStoreInfo(storeInfo: StoreVO) {
  return saveLocalJson(STOREINFO, storeInfo);
}

export interface IAuthInfo {
  /**
   * 账号激活状态
   */
  activated?: number;
  /**
   * 业务员id
   */
  employeeId?: string;
  /**
   * 业务员名称
   */
  employeeName?: string;
  /**
   * 店铺id
   */
  lastStoreId?: string;
  /**
   * 公司信息ID
   */
  merchantId?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 已经选择店铺
   */
  selectedStore?: boolean;
  /**
   * jwt验证token
   */
  token?: string;
}
