/*
 *
 * NavBarContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_DETAILS,
  UPDATE_DETAILS_SUCCESS,
  RESET_SUCCESS,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  GET_PROFILE_DATA,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REMOVE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProfileData(data) {
  console.log(  " inside get profile data action")
   return {
     type: GET_PROFILE_DATA,
     data
   }
 }
 export function getProfileSuccess(data) {
   console.log(" kukukukukukuku ")
   return {
     type: GET_PROFILE_SUCCESS,
     data
   }
 }
 export function getProfileRemove(data) {
   return {
     type: GET_PROFILE_REMOVE,
     data
   }
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
 
export function signOut() {
  // console.log("sign out action called");
  return {
    type: 'SIGN_OUT',
  };
}
