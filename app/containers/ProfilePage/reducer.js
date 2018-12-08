/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, UPDATE_DETAILS, UPDATE_DETAILS_SUCCESS, RESET_SUCCESS,UPLOAD_PROFILE_IMAGE,UPLOAD_PROFILE_IMAGE_SUCCESS,GET_PROFILE_SUCCESS
} from './constants';

const initialState = fromJS({});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_PROFILE_SUCCESS:
      return state
      .set('userInfo', action.data)
    case UPLOAD_PROFILE_IMAGE:
      return state
        .set('profileimg', action.data.imageProfile)
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return state
        .set('profileimgRet', action.data)
    case UPDATE_DETAILS:
      return state
        .set('details', action.data)
    case UPDATE_DETAILS_SUCCESS:
      return state
        .set('updateSuccess', action.data)
    case RESET_SUCCESS:
      return state
        .set('profileimgRet',null)
        .set('updateSuccess', false)
    default:
      return state;
  }
}

export default profilePageReducer;
