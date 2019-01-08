/*
 *
 * SecurityPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ENABLE_2FA,
  DISABLE_2FA,
  SUCCESS_2FA,
  VERIFY_2FA,
  REMOVE_RESPONSE,
  RESPONSE_2FA,
  SAVE_ACTIVITY,
  SAVE_ACTIVITY_SUCCESS,
  SAVE_ACTIVITY_REMOVE,
  LOAD_ACTIVITY_STATUS,
  LOAD_ACTIVITY_SUCCESS
} from './constants';



export function loadActivitySuccess(data) {
  return {
    type: LOAD_ACTIVITY_SUCCESS,
    data,
  };
}

export function removeActivitySuccess(data) {
  return {
    type: SAVE_ACTIVITY_REMOVE,
    data,
  };
}
export function loadActivityStatus(data) {
  return {
    type: LOAD_ACTIVITY_STATUS,
    data,
  };
}


export function saveActivitySuccess(data) {
  return {
    type: SAVE_ACTIVITY_SUCCESS,
    data,
  };
}
export function saveActivity(data) {
  return {
    type: SAVE_ACTIVITY,
    data,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function enable2fa() {
  return {
    type: ENABLE_2FA,

  };
}
export function success2fa(data) {
  return {
    type: SUCCESS_2FA,
    data,

  };
}
export function disable2fa() {
  return {
    type: DISABLE_2FA,

  };
}
export function verify2fa(data) {
  return {
    type: VERIFY_2FA,
    data,

  };
}
export function response2fa(data) {
  return {
    type: RESPONSE_2FA,
    data,

  };
}
export function removeResponse() {
  return {
    type: REMOVE_RESPONSE,


  };
}
