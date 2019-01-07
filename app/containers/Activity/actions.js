/*
 *
 * Activity actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_LOGS,
  LOAD_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadActivity(data) {
  console.log(" inside get Log Acrtion ")
  return {
    type: LOAD_LOGS,
    data,
  };
}
export function loadSuccess(data) {
  console.log(" inside  Log success Acrtion ",data)
  return {
    type: LOAD_SUCCESS,
    data,
  };
}
