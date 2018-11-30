import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  LOAD_PROFILE,
  SUBMIT_SOCIAL,
  DELETE_USER,
} from 'containers/DashBoardWelcomePage/constants';
import {
  profileLoaded,
  loadProfileAction,
} from 'containers/DashBoardWelcomePage/actions';
import { push } from 'react-router-redux';
import { emailVerified, twoFactorEnabled  } from 'containers/App/actions';
import { makeSelectSocial } from 'containers/DashBoardWelcomePage/selectors';
import { deleteUserSuccessAction } from 'containers/DashBoardWelcomePage/actions';

import api from 'utils/api';

export function* loadProfile() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.profile, headers);
    if (apiData) {
    //  console.log(apiData);
      if (!apiData.success) {
        localStorage.removeItem('token');
        yield put(push('/signin'));
      }
      yield put(emailVerified(''));
      yield put(twoFactorEnabled(apiData.useInfo.is2FAEnabled));
      yield put(profileLoaded(apiData.useInfo));
    }
  } catch (err) {
    // console.log("api failed");
    // console.log(err)
  }
}

export function* submitSocial() {
  try {
    const data = yield select(makeSelectSocial());

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.submitSocialDetails, headers, data);
    if(apiData.success) {
      yield put(loadProfileAction());
    }
  }
  catch (err) {
    console.log('twitter and telegram submit failed', err);
  }
}
export function* deleteUser() {
  try {


    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.deleteUser, headers);
 console.log(apiData,"apiData in saga");
    if(apiData.success) {
      // localStorage.removeItem('token');
      //  yield put(deleteUserSuccessAction());
      //  yield put(push('/signin'));

    }
    if(!apiData.success)
    {
      console.log(" Inside false");
       yield put(deleteUserSuccessAction());
       localStorage.removeItem('token');
       yield put(push('/signin'));
    }
  }
  catch (err) {
    console.log("Error in catch",err);
  }
}
export default function* defaultSaga() {
  yield [
    takeLatest(LOAD_PROFILE, loadProfile),
    takeLatest(SUBMIT_SOCIAL, submitSocial),
    takeLatest(DELETE_USER, deleteUser)
  ];
}
