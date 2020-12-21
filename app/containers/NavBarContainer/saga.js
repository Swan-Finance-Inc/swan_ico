// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { UPDATE_DETAILS ,UPLOAD_PROFILE_IMAGE, GET_PROFILE_DATA } from './constants';
import makeSelectProfilePage, { makeSelectDetails , makeSelectProfileImage } from './selectors';
import { updateDetailsSuccess ,uploadProfileImageSuccess, getProfileSuccess } from './actions';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'
// Individual exports for testing
export function* updateDetails(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const data = yield select(makeSelectDetails());
    const apiData = yield call(api.user.updateProfile, headers, data);

    if(apiData.success){
      yield put(updateDetailsSuccess(apiData))
    }
  }catch(err){
    yield put(codeErrorAction())
  }
}
export function* uploadProfileImage(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }
    const data = yield select(makeSelectProfileImage());
    console.log(data,"sdjahkdv")
    const fd = new FormData();
    fd.append('imageProfile',data)
    const apiData = yield call(api.user.uploadProfileImage, headers,fd);
    console.log(apiData,'api data....')
    if(apiData.success){
      console.log(" Succeasaaaaaaa");
      yield put(uploadProfileImageSuccess(apiData))
  }
  }catch(err){
  yield put(codeErrorAction())
    console.log(err)
  }
}
export function* getProfileData(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }
    const apiData = yield call(api.user.profile, headers);
    console.log(apiData,'api data....')
    if(apiData.success){
      console.log(" Succeasaaaaaaa");
      yield put(getProfileSuccess(apiData.useInfo))
  }
  }
  catch(err){
  yield put(codeErrorAction())
    console.log(err)
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(UPDATE_DETAILS, updateDetails),
    takeLatest(UPLOAD_PROFILE_IMAGE, uploadProfileImage),
    takeLatest(GET_PROFILE_DATA, getProfileData),
  ];
}
