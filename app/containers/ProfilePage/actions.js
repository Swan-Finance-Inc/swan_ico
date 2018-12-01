/*
 *
 * ProfilePage actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_DETAILS,
  UPDATE_DETAILS_SUCCESS,
  RESET_SUCCESS,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_SUCCESS
} from './constants';
import { REGISTER } from 'redux-persist';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function uploadProfileImage(data) {
  return {
    type: UPLOAD_PROFILE_IMAGE,
    data
  }
}
export function uploadProfileImageSuccess(data) {
  return {
    type: UPLOAD_PROFILE_IMAGE_SUCCESS,
    data
  }
}
export function updateDetails(data) {
  return {
    type: UPDATE_DETAILS,
    data
  }
}

export function updateDetailsSuccess(data) {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    data
  }
}

export function resetSuccess(data) {
  return {
    type: RESET_SUCCESS,
    data
  }
}
