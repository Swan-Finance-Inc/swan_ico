import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import api from 'utils/api';
import { SUBMIT_KYC, SUBMIT_KYC_DOC, GET_KYC_DETAILS, FRACTAL_KYC, UPDATE_FRACTAL_KYC } from './constants';
import { makeSelectKycDetails, makeSelectKycDoc, makeSelectSubmitKycFractal, makeSelectUpdateKycFractal } from './selectors';
import { submitKycSuccess, submitKycDocSuccess, submitKycDocSuccessRemove, updateFractalKycSuccess } from './actions';
import { push } from 'react-router-redux';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'

export function* submitKyc() {
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
        },
    };

    const data = yield select(makeSelectKycDetails());
    console.log(data," input fields in UpdateKycSaga")
    const details = {
      fullName : data.fullName,
      dob : data.dob,
      gender : data.gender,
      phoneNumber : data.phone,
      ethAddress : data.ethAddress,
      citizenship : data.citizenship,
      country : data.country,
      state : data.state,
      city : data.city,
      address : data.address,
      address2 : data.address2,
      documentType : data.doc_type,
      documentNumber : data.doc_number
    }
    const apiData = yield call(api.user.updateKycDetails, headers, details);
  console.log(apiData," apidata in updateKycDetails")
    if(apiData){
      yield put(submitKycSuccess(apiData));
    }else{
      console.log(apiData);
    }

  }catch(err){
    yield put(codeErrorAction(codeErrorAction));
    console.log('error : ',err);
  }

}

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
      yield put(submitKycDocSuccessRemove());

      console.log('from saga', apiData);
    }else{
      console.log(err);
    }
  }catch(err){
      yield put(codeErrorAction(codeErrorAction));
    console.log('error : ',err);
  }
}

export function* getKycDetails() {
  fractalKYC
}
export function* fractalKYC() {
  console.log("entered saga");
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
        },
    };

    const data = yield select(makeSelectSubmitKycFractal());

    console.log(data," input fields in fractalKycSaga")

    const apiData = yield call(api.user.fractalKYC, headers, data);
  console.log(apiData," apidata in fractalKycDetails")
    if(apiData){
      //yield put(submitKycSuccess(apiData));
      console.log(apiData, "success!!!")
    }else{
      console.log(apiData);
    }

  }catch(err){
    yield put(codeErrorAction(codeErrorAction));
    console.log('error : ',err);
  }

}
export function* updateFractalKyc() {
  console.log("entered saga");
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
        },
    };

    const data = yield select(makeSelectUpdateKycFractal());

    console.log(data," input fields in UPDATEfractalKycSaga")
    const details = {
      email: data
    }
    console.log(details,"details - input fields in UPDATEfractalKycSaga")
    const apiData = yield call(api.user.updateFractalKyc, headers, details);
  console.log(apiData," apidata in UPDATEfractalKycDetails")
    if(apiData){
      yield put(updateFractalKycSuccess(apiData));
      console.log(apiData, "UPDATIONsuccess!!!")
    }else{
      console.log(apiData);
    }

  }catch(err){
    yield put(codeErrorAction(codeErrorAction));
    console.log('error : ',err);
  }

}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(SUBMIT_KYC, submitKyc),
    takeEvery(SUBMIT_KYC_DOC, submitKycDoc),
    takeLatest(FRACTAL_KYC, fractalKYC),
    takeLatest(UPDATE_FRACTAL_KYC, updateFractalKyc)
  ];
}
