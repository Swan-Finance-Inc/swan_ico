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
  LOAD_FAQ,
  LOAD_NEWS,
  LOAD_ANNOUNCEMENTS
} from 'containers/DashBoardWelcomePage/constants';
import {
  profileLoaded,
  loadProfileAction,
  loadFaqSuccess,
  loadNewsSuccess,
  loadAnnouncementsSuccess
} from 'containers/DashBoardWelcomePage/actions';
import { push } from 'react-router-redux';
import { emailVerified, twoFactorEnabled  } from 'containers/App/actions';
import { makeSelectSocial } from 'containers/DashBoardWelcomePage/selectors';
import { deleteUserSuccessAction } from 'containers/DashBoardWelcomePage/actions';
import { codeErrorAction } from './actions'

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
      yield put(codeErrorAction());
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
      yield put(codeErrorAction());
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
      localStorage.removeItem('token');
       yield put(deleteUserSuccessAction());
       yield put(push('/signin'));

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
      yield put(codeErrorAction());
    console.log("Error in catch",err);
  }
}
export function* loadFaq() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.getFaq, headers);
    if(apiData.success) {
      yield put(loadFaqSuccess(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}

export function* loadAnnouncements() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    console.log('loadAnnouncements saga');

    const apiData = yield call(api.user.getAnnouncements, headers);
    if(apiData.success) {
      console.log('loadAnnouncementsSuccess saga success: ', apiData);
      yield put(loadAnnouncementsSuccess(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}

export function* loadNews() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.getNews, headers);
    if(apiData.success) {
      yield put(loadNewsSuccess(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}

export default function* defaultSaga() {
  yield [
    takeLatest(LOAD_PROFILE, loadProfile),
    takeLatest(SUBMIT_SOCIAL, submitSocial),
    takeLatest(DELETE_USER, deleteUser),
    takeLatest(LOAD_FAQ, loadFaq),
    takeLatest(LOAD_NEWS, loadNews),
    takeLatest(LOAD_ANNOUNCEMENTS, loadAnnouncements)
  ];
}
