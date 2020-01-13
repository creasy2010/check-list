import {Command} from '../constant';
import {IAllReducerProps} from '../types';
import {redux} from 'moon-runtime';
import {PageModel} from './index';
import api from '@/api';

export default class Action extends redux.BaseAction<IAllReducerProps> {
  constructor(pageModel: PageModel) {
    super(pageModel);
  }
}

//create by moon https://github.com/creasy2010/moon
