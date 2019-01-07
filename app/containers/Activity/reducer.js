/*
 *
 * Activity reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, LOAD_LOGS, LOAD_SUCCESS

} from './constants';

const initialState = fromJS({
  loading:false,
  logs:false
});

function activityReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_LOGS:
        return state
        .set('loading', true)
  case LOAD_SUCCESS:
      return state
      .set('loading', false)
      .set('logs',action.data)
    default:
      return state;
  }
}

export default activityReducer;
