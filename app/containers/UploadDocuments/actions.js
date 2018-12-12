/*
 *
 * UploadDocuments actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_DOC,
  SUBMIT_DOC_SUCCESS,
  RESET_DOC_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function submitDoc(data) {
  return {
    type: SUBMIT_DOC,
    data
  }
}

export function submitKycDocSuccess(data) {
  return {
    type: SUBMIT_DOC_SUCCESS,
    data
  }
}

export function resetDocSuccess(data) {
  return {
    type: RESET_DOC_SUCCESS,
    data
  }
}
