/*
 *
 * MyReferal actions
 *
 */

import {
  DEFAULT_ACTION, GET_REFERAL_DATA, GET_REFER_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getReferSuccess(data) {

  return {
    type: GET_REFER_SUCCESS,
    data
  };
}
export function getReferalData(data) {
  return {
    type: GET_REFERAL_DATA,
    data
  };
}
