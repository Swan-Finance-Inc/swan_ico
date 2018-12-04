/*
 *
 * Unsubscribe actions
 *
 */

import {
  DEFAULT_ACTION,
  UNSUBSCRIBE_USER_ACTION,
  UNSUBSCRIBE_USER_ACTION_SUCCESS,
  UNSUBSCRIBE_USER_ACTION_SUCCESS_CLEAR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function unsubscribeUserAction(data) {
  return {
    type: UNSUBSCRIBE_USER_ACTION,
    data
  }
}

export function unsubscribeUserActionSuccess() {
  return {
    type: UNSUBSCRIBE_USER_ACTION_SUCCESS
  }
}

export function unsubscribeUserActionSuccessClear() {
  return {
    type: UNSUBSCRIBE_USER_ACTION_SUCCESS_CLEAR
  }
}
