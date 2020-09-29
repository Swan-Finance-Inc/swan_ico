/*
 *
 * ResendConfirmationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  RESEND_MAIL,
  RESEND_MAIL_ERROR,
  RESEND_MAIL_SUCCESS,
  REMOVE_MAIL
} from './constants';

const initialState = fromJS({});

function resendConfirmationPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESEND_MAIL:
      return state
        .set('data',action.data);
    case RESEND_MAIL_ERROR:
      return state
        .set('resendError',action.data);
    case RESEND_MAIL_SUCCESS:
      return state
        .set('resendSuccess',action.data);
    case REMOVE_MAIL:
        return state
        .set('resendSuccess',false)
    default:
      return state;
  }
}

export default resendConfirmationPageReducer;
