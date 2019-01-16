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
  CODE_ERROR_REMOVE,
  LOAD_FAQ,
  LOAD_FAQ_SUCCESS,
  LOAD_NEWS,
  LOAD_NEWS_SUCCESS,
  LOAD_ANNOUNCEMENTS,
  LOAD_ANNOUNCEMENTS_SUCCESS,
  TOGGLE_INFO_ACTIVE,
  TOGGLE_INFO_ACTIVE_SUCCESS,
  TOGGLE_INFO_ACTIVE_GET,
  TOGGLE_INFO_ACTIVE_GET_SUCCESS
} from './constants';

export function getToggleInfoActive() {
  console.log('action : ');
  return {
    type: TOGGLE_INFO_ACTIVE_GET
  };
}

export function getToggleInfoActiveSuccess(data) {
  console.log('action : ');
  return {
    type: TOGGLE_INFO_ACTIVE_GET_SUCCESS,
    data
  };
}

export function toggleInfoActive(data) {
  console.log('action : ', data);
  return {
    type: TOGGLE_INFO_ACTIVE,
    data
  };
}

// export function toggleInfoActive(data) {
//   console.log('action : ', data);
//   return {
//     type: TOGGLE_INFO_ACTIVE,
//     data
//   };
// }

export function toggleInfoActiveSuccess(data) {
  return {
    type: TOGGLE_INFO_ACTIVE_SUCCESS,
    data
  };
}

export function loadFaqSuccess(data) {
  return {
    type: LOAD_FAQ_SUCCESS,
    data
  };
}
export function loadFaq() {
  return {
    type: LOAD_FAQ,
  };
}

export function loadAnnouncementsSuccess(data) {
  return {
    type: LOAD_ANNOUNCEMENTS_SUCCESS,
    data
  };
}
export function loadAnnouncements() {
  return {
    type: LOAD_ANNOUNCEMENTS,
  };
}

export function loadNewsSuccess(data) {
  return {
    type: LOAD_NEWS_SUCCESS,
    data
  };
}
export function loadNews() {
  return {
    type: LOAD_NEWS,
  };
}

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
