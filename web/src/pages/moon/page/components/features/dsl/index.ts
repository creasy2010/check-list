/**
 * @desc
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2019/6/4
 **/

import * as FDialog from './h5/f-dialog';
import * as FAction from './common/f-action';
import * as FBreadcrumb from './other/f-breadcrumb';
import * as FPagingQuery from './common/f-paging-query';
import * as FAddEdit from './common/f-add-edit';
import * as UImgcook from './common/ui-imgcook';
import * as USearchList from './h5/u-search-list';
import * as UAntdTable from './h5/u-antd-table';
import * as UAntdTabs from './h5/u-antd-tabs';
import * as UForm from './h5/u-form';
import * as TaroUList from './taro/u-list';
import * as TaroUScrollView from './taro/u-scroll-view';
import * as TaroUForm from './taro/u-form';
import {TargetType} from "moon-core/declarations/typings/config";

const allFeature =[
  FDialog,
  FPagingQuery,
  FAction,
  FAddEdit,
  USearchList,
  UAntdTable,
  UImgcook,
  TaroUList,
  TaroUForm,
  TaroUScrollView,
  UAntdTabs,
  UForm,
  FBreadcrumb,
];

export function getFeatures(target:TargetType,projectName:string) {
  return allFeature.filter(item=>item.FeatureInfo.target.test(target+"-"+projectName));
}
export default allFeature;
