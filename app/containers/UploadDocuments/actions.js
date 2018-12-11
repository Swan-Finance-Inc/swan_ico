/*
 *
 * UploadDocuments actions
 *
 */

import {
  DEFAULT_ACTION,
  SUBMIT_DOC,
  SUBMIT_DOC_SUCCESS,
  RESET_SUCCESS
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

export function resetSuccess() {
  return {
    type: RESET_SUCCESS
  }
}
