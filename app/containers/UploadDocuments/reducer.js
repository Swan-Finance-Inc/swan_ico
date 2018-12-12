/*
 *
 * UploadDocuments reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SUBMIT_DOC,
  SUBMIT_DOC_SUCCESS,
  RESET_DOC_SUCCESS
} from './constants';

const initialState = fromJS({});

function uploadDocumentsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case SUBMIT_DOC:
        return state.set('kycDoc', action.data)
      case SUBMIT_DOC_SUCCESS:
        return state.set('kycDocSuccess', action.data)
      case RESET_DOC_SUCCESS:
        return state.set('kycDocSuccess', false)

    default:
      return state;
  }
}

export default uploadDocumentsReducer;
