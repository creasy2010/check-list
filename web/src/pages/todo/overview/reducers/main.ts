import _ from 'lodash';
import {IMainReducer} from '../types';

export const INITIAL_STATE: IMainReducer = {
  isReady: false,
  tasks:[],
  records:[],
  showRecordModel:false
};

//create by moon https://github.com/creasy2010/moon
