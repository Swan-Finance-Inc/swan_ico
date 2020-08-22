/*
 *
 * KycPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_KYC,
  SUBMIT_KYC_SUCCESS,
  RESET_SUCCESS,
  SUBMIT_KYC_DOC,
  SUBMIT_KYC_DOC_SUCCESS,
  KYC_DOC_SUCCESS_REMOVE,
  FRACTAL_KYC,
  UPDATE_FRACTAL_KYC,
  UPDATE_FRACTAL_KYC_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function submitKyc(data) {
  return {
    type: SUBMIT_KYC,
    data
  }
}
export function submitKycSuccess(data) {
  return {
    type: SUBMIT_KYC_SUCCESS,
    data
  }
}

export function submitKycDoc(data) {
  return {
    type: SUBMIT_KYC_DOC,
    data
  }
}

export function submitKycDocSuccess(data) {
  return {
    type: SUBMIT_KYC_DOC_SUCCESS,
    data
  }
}
export function submitKycDocSuccessRemove(data) {
  return {
    type: KYC_DOC_SUCCESS_REMOVE,
    data
  }
}

export function resetSuccess() {
  return {
    type: RESET_SUCCESS
  }
}

export function fractalKYC(data) {
  return {
    type: FRACTAL_KYC,
    data
  }
}
export function updateFractalKyc(data) {
  return {
    type: UPDATE_FRACTAL_KYC,
    data
  }
}
export function updateFractalKycSuccess(data) {
  return {
    type: UPDATE_FRACTAL_KYC_SUCCESS,
    data
  }
}