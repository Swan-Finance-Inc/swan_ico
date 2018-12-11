import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import api from 'utils/api';
import { SUBMIT_DOC } from './constants';
import {  makeSelectKycDoc } from './selectors';
import { submitKycDocSuccess } from './actions';
import { push } from 'react-router-redux';


export function* submitKycDoc() {
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
         'content-type': 'multipart/form-data'
        },
    };

    const data = yield select(makeSelectKycDoc());
    console.log(data);
    const body = new FormData();

    body.append(data.field, data.image);

    const apiData = yield call(api.user.uploadKycDoc, headers, body);

    if(apiData.success){
      yield put(submitKycDocSuccess(apiData));
      console.log('from saga', apiData);
    }else{
      console.log(err);
    }
  }catch(err){
    console.log('error : ',err);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeEvery(SUBMIT_DOC, submitKycDoc)
  ];
}
