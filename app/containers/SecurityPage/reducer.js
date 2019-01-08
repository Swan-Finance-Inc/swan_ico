/*
 *
 * SecurityPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, ENABLE_2FA, DISABLE_2FA, SUCCESS_2FA,VERIFY_2FA, RESPONSE_2FA,REMOVE_RESPONSE, SAVE_ACTIVITY_SUCCESS,
   SAVE_ACTIVITY, SAVE_ACTIVITY_REMOVE, LOAD_ACTIVITY_SUCCESS
} from './constants';

const initialState = fromJS({
  enable2fa: false,
  disable2fa: false,
  qrCode:'',
  otp:'',
  verified:false,
  errorMessage:false,
  error:false,
  saveActivityRet:false,
  saveActivity:false,
  loadActivitySuccess:false,
  ActivityStatus:false
});

function securityPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITY_SUCCESS:
      return state
        .set('loadActivitySuccess',action.data)
    case SAVE_ACTIVITY:
      return state
        .set('saveActivity',action.data)
    case SAVE_ACTIVITY_SUCCESS:
      return state
        .set('ActivityStatus',action.data.saveActivityLogs)
        .set('saveActivityRet',action.data)
    case SAVE_ACTIVITY_REMOVE:
    return state
      .set('saveActivityRet',false)
    case ENABLE_2FA:
      return state
       .set('enable2fa',true)
       .set('disable2fa',false);
    case DISABLE_2FA:
       return state
       .set('disable2fa',true)
       .set('enable2fa',false);
    case SUCCESS_2FA:
      return state
        .set('qrCode',action.data.qrCode)
        .set('qrKey',action.data.qrKey);
    case VERIFY_2FA:
      return state
       .set('otp',action.data)
       .set('verified',true)
       .set('enable2fa',true)
       .set('disable2fa',false);
    case RESPONSE_2FA:
    return state
    .set('response',action.data);

   case REMOVE_RESPONSE:
      return state
       .set('response',false);

    default:
      return state;
  }
}

export default securityPageReducer;
