/*
 *
 * MyReferal reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, GET_REFERAL_DATA, GET_REFER_SUCCESS
} from './constants';

const initialState = fromJS({
    loading:false,
    referData:'',
});

function myReferalReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case GET_REFERAL_DATA:
        return state
        .set('loading',true);
      case GET_REFER_SUCCESS:
        return state
        .set('loading',false)
        .set('referData',action.data)
    default:
      return state;
  }
}

export default myReferalReducer;
