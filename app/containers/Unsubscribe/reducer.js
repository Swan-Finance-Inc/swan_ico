/*
 *
 * Unsubscribe reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UNSUBSCRIBE_USER_ACTION,
  UNSUBSCRIBE_USER_ACTION_SUCCESS,
  UNSUBSCRIBE_USER_ACTION_SUCCESS_CLEAR
} from './constants';

const initialState = fromJS({});

function unsubscribeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UNSUBSCRIBE_USER_ACTION:
      return state.set('data', action.data);
    case UNSUBSCRIBE_USER_ACTION_SUCCESS:
      return state.set('success', true);
    case UNSUBSCRIBE_USER_ACTION_SUCCESS_CLEAR:
      return state.set('success', false);
    default:
      return state;
  }
}

export default unsubscribeReducer;
