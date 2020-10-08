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
  LOAD_ANNOUNCEMENTS,
  TOGGLE_INFO_ACTIVE,
  TOGGLE_INFO_ACTIVE_GET,
  GET_CROWDSALE_DATA,
  GET_REFERRALS_EARNED
} from 'containers/DashBoardWelcomePage/constants';
import {
  profileLoaded,
  loadProfileAction,
  loadFaqSuccess,
  loadNewsSuccess,
  loadAnnouncementsSuccess,
  toggleInfoActiveSuccess,
  getToggleInfoActiveSuccess,
  getCrowdsaleDataRet,
  getCrowdsaleDataLoading,
  getReferralsEarnedRet
} from 'containers/DashBoardWelcomePage/actions';
import { push } from 'react-router-redux';
import { emailVerified, twoFactorEnabled  } from 'containers/App/actions';
import { makeSelectSocial, makeSelectToggleInfoActive ,makeSelectGetCrowdsaleData } from 'containers/DashBoardWelcomePage/selectors';
import { deleteUserSuccessAction } from 'containers/DashBoardWelcomePage/actions';
import { codeErrorAction } from './actions'

import api from 'utils/api';

export function* toggleInfoActiveSagaGet() {
  try {
    console.log('toggleInfoActiveSagaGet');

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.toggleInfoIconGet, headers);
    if (apiData) {
    //  console.log(apiData);
      if (!!apiData.success) {
        // Success
        console.log('toggleInfoActiveSagaGet success : ');

        console.log('apiData : toggleInfoActiveSagaGet : *** : ', apiData);
        yield put(getToggleInfoActiveSuccess(apiData))
      }
    }
  } catch (err) {
      yield put(codeErrorAction());
    // console.log("api failed");
    // console.log(err)
  }
}

export function* toggleInfoActiveSaga() {
  try {
    console.log('toggleInfoActiveSaga');
    const data = yield select(makeSelectToggleInfoActive());
    console.log('toggleInfoActiveSaga : data : ', data);
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.toggleInfoIcon, data, headers);
    if (apiData) {
    //  console.log(apiData);
      if (!!apiData.success) {
        // Success

        console.log('apiData : toggleInfoActiveSaga : *** : ', apiData);
        yield put(toggleInfoActiveSuccess(apiData))
      }
    }
  } catch (err) {
      yield put(codeErrorAction());
    // console.log("api failed");
    // console.log(err)
  }
}


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

export function* getCrowdsaleDataSaga() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.getCrowdsaleData, headers);
    if(apiData) {
      yield put(getCrowdsaleDataRet(apiData));
      yield put(getCrowdsaleDataLoading(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}

export function* getReferralsEarned() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };

    const apiData = yield call(api.user.getReferralsEarned, headers);
    if(apiData.success) {
      yield put(getReferralsEarnedRet(apiData));
    }
  }
  catch (err) {
    console.log('error in load referrals earned', err);
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
    takeLatest(LOAD_ANNOUNCEMENTS, loadAnnouncements),
    takeLatest(TOGGLE_INFO_ACTIVE, toggleInfoActiveSaga),
    takeLatest(TOGGLE_INFO_ACTIVE_GET, toggleInfoActiveSagaGet),
    takeLatest(GET_CROWDSALE_DATA, getCrowdsaleDataSaga),
    takeLatest(GET_REFERRALS_EARNED, getReferralsEarned)


  ];
}
