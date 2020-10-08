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
  CODE_ERROR,
  LOAD_FAQ_SUCCESS,
  LOAD_NEWS_SUCCESS,
  LOAD_ANNOUNCEMENTS_SUCCESS,
  TOGGLE_INFO_ACTIVE,
  TOGGLE_INFO_ACTIVE_SUCCESS,
  TOGGLE_INFO_ACTIVE_GET,
  TOGGLE_INFO_ACTIVE_GET_SUCCESS,
  GET_CROWDSALE_DATA,
  GET_CROWDSALE_DATA_RET,
  GET_CROWDSALE_DATA_LOADING,
  GET_REFERRALS_EARNED,
  GET_REFERRALS_EARNED_RET
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
  ethAddress: '',
  faqData:false,
  newsData:false,
  announcementsData: false,
  toggleInfoActive:false,
  getCrowdsaleData:false,
  getCrowdsaleDataRet:false,
  getCrowdsaleDataLoading:false,
  getReferralsEarned: false,
  getReferralsEarnedRet: false

});

function dashBoardWelcomePageReducer(state = initialState, action) {
  switch (action.type) {
  //@aj
  case TOGGLE_INFO_ACTIVE:
    console.log('TOGGLE_INFO_ACTIVE data : ', action.data);
      return state
        .set('toggleInfoActive', action.data);
  case TOGGLE_INFO_ACTIVE_SUCCESS:
    console.log('TOGGLE_INFO_ACTIVE data : ', action.data);
      return state
        .set('toggleInfoActive', action.data);
  case TOGGLE_INFO_ACTIVE_GET:
    console.log('TOGGLE_INFO_ACTIVE_GET data : ', action.data);
      return state;

  case TOGGLE_INFO_ACTIVE_GET_SUCCESS:
    console.log('TOGGLE_INFO_ACTIVE_GET_SUCCESS data : ', action.data);
      return state
        .set('toggleInfoActive', action.data);
  //@aj
  case DELETE_USER_SUCCESS:
      return state
        .set('loading', false);
  case LOAD_FAQ_SUCCESS:
      return state
        .set('faqData', action.data.result);
  case LOAD_ANNOUNCEMENTS_SUCCESS:
      return state
        .set('announcementsData', action.data.result);

  case LOAD_NEWS_SUCCESS:
      return state
        .set('newsData', action.data.result);
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
        .set('errorGlobal', true);
    }

    case CODE_ERROR_REMOVE:
      return state
        .set('errorGlobal', false);

    case GET_CROWDSALE_DATA:
      return state
        .set('getCrowdsaleData', action.data)
        .set('getCrowdsaleDataLoading',true)
    case GET_CROWDSALE_DATA_RET:
      return state  
      .set('getCrowdsaleDataRet', action.data)
      .set('getCrowdsaleDataLoading',false)
    case GET_CROWDSALE_DATA_LOADING:
      return state
      .set('getCrowdsaleDataLoading',false)
    case GET_REFERRALS_EARNED_RET:
      return state  
      .set('getReferralsEarnedRet', action.data)
    default:
      return state;
  }
}

export default dashBoardWelcomePageReducer;
