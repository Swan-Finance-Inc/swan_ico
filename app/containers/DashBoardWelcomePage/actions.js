/*
 *
 * DashBoardWelcomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  SUBMIT_SOCIAL,
  KYC_DONE,
  RESET_KYC_DONE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  CODE_ERROR,
  CODE_ERROR_REMOVE
} from './constants';

export function deleteUserSuccessAction() {
  return {
    type: DELETE_USER_SUCCESS,
  };
}
export function deleteUserAction() {
  return {
    type: DELETE_USER,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadProfileAction() {
  return {
    type: LOAD_PROFILE,
  };
}

export function profileLoaded(data) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
  };
}

export function submitSocial(data) {
  return {
    type: SUBMIT_SOCIAL,
    data
  };
}

export function kycDone () {
  return {
    type: KYC_DONE
  }
}

export function resetKycDone() {
  return {
    type: RESET_KYC_DONE
  }
}
export function codeErrorAction(data) {
  console.log(" in code error of action ")
  return {
    type: CODE_ERROR,
    data
  }
}
export function codeErrorRemove(data){
  return {
    type: CODE_ERROR_REMOVE,
    data
  }
}
