/*
 *
 * DashBoardWelcomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  SUBMIT_SOCIAL,
  KYC_DONE,
  RESET_KYC_DONE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  CODE_ERROR_REMOVE,
  CODE_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  errorGlobal:false,
  loading: false,
  error: false,
  errorMessage: false,
  userInfo: {
    tokens: {
      total: 0,
      referral: 0,
      vote: 0,
    },
    referral: {
      code: 'YOUR CODE',
      success: 0,
      pending: 0,
    }
  },
  kycDone: false,
  ethAddress: ''
});

function dashBoardWelcomePageReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_SUCCESS:
      return state
        .set('loading', false);
    case DELETE_USER:
      return state
        .set('loading', true);
    case LOAD_PROFILE:
      return state
        .set('loading', true);
    case LOAD_PROFILE_SUCCESS:
      return state
        .set('loading', false)
        .set('userInfo', action.data);
    case DEFAULT_ACTION:
      return state;

    case SUBMIT_SOCIAL:
      return state
        .set('socialDetails', action.data);

    case KYC_DONE:
      return state
        .set('kycDone', true);

    case RESET_KYC_DONE:
      return state
        .set('kycDone', false);
    case CODE_ERROR:
    {
      console.log(" in reducer of eror action ")
      return state
        .set('errorGlobal', action.data);
    }

    case CODE_ERROR_REMOVE:
      return state
        .set('errorGlobal', false);
    default:
      return state;
  }
}


export default dashBoardWelcomePageReducer;
