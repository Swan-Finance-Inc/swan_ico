/*
 *
 * KycPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_KYC, SUBMIT_KYC_SUCCESS,RESET_SUCCESS,SUBMIT_KYC_DOC,SUBMIT_KYC_DOC_SUCCESS,GET_KYC_DETAILS, KYC_DOC_SUCCESS_REMOVE, FRACTAL_KYC, UPDATE_FRACTAL_KYC, UPDATE_FRACTAL_KYC_SUCCESS
} from './constants';

const initialState = fromJS({});

function kycPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_KYC:
      return state.set('kycDetails', action.data)
    case SUBMIT_KYC_SUCCESS:
      return state.set('submitKycSuccess', action.data)
    case RESET_SUCCESS:
      return state.set('submitKycSuccess', false)
    case SUBMIT_KYC_DOC:
      return state.set('kycDoc', action.data)
    case SUBMIT_KYC_DOC_SUCCESS:
      return state.set('kycDocSuccess', action.data)
    case KYC_DOC_SUCCESS_REMOVE:
      return state.set('kycDocSuccess', false)
    case FRACTAL_KYC:
      return state.set('fractalKYC', action.data)
    case UPDATE_FRACTAL_KYC:  
      return state.set('updateFractal', action.data)
    case UPDATE_FRACTAL_KYC_SUCCESS:  
      return state.set('updateFractalSuccess', action.data)
    default:
      return state;
  }
}

export default kycPageReducer;
