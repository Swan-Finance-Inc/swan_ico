import { takeLatest, call, put, select } from 'redux-saga/effects';
import api from 'utils/api';
import { twoFactorEnabled, twoFactorDisabled } from 'containers/App/actions';
import { makeSelectVerify, makeSelectSaveActivity } from './selectors';
import { ENABLE_2FA, VERIFY_2FA, DISABLE_2FA, SAVE_ACTIVITY, LOAD_ACTIVITY_STATUS } from './constants';
import { success2fa, response2fa, removeResponse, saveActivitySuccess, loadActivitySuccess } from './actions';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'

export function* securityChanged() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    // console.log(userData)
    const apiData = yield call(api.user.enable2fa, headers);
    // console.log('from saga', apiData);
    let key = apiData.secretCode;
    key = key.substring(key.indexOf("=")+1, key.length);
  //  console.log(key);
    if (apiData.success) {
      // yield put(success2fa(apiData.qrCode));
      const data = {
          qrCode : apiData.qrCode,
          qrKey : key
        }
      yield put(success2fa(data));
    }
  } catch (err) {
  yield put(codeErrorAction(err));
  // console.log("api failed");
  // console.log(err)


  }
}

export function* verify2fa() {
  try {
    // console.log("verifying")
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const otp = yield select(makeSelectVerify());
    const body = {
      '2faToken': otp,
    };
    const apiData = yield call(api.user.verify2fa, body, headers);
    // console.log('from saga kkk', apiData);
    if (apiData) {
      yield put(response2fa(apiData));
      yield put(removeResponse());
    }

    if (apiData.success) {
      yield put(twoFactorEnabled(true));
    }
    // console.log(body)
  } catch (err) {
    yield put(codeErrorAction(err));
    // console.log("api failed");
    // console.log(err)
  }
}

export function* disabling2fa() {
  try {
    // console.log("disabling")
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };


    const apiData = yield call(api.user.disable2fa, headers);
    // console.log('from saga', apiData);

    if (apiData.success) {
      yield put(twoFactorDisabled(true));
    } else if (!apiData.success) {
      yield put(twoFactorDisabled(true));
    }
  } catch (err) {
    yield put(codeErrorAction(err));
    // console.log("api failed");
    // console.log(err)
  }
}
export function* saveActivity() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    console.log(headers," ddsnfjdsfjkdsfjkdsfjkdsjfkdsjkfjksdfjksdf")
    const saveActivityLogs = yield select(makeSelectSaveActivity());

   const body = {
     saveActivityLogs:saveActivityLogs.saveActivityLogs
   }
   console.log(body," body in saga");
    const apiData = yield call(api.user.saveActivity, headers, body);
    console.log(apiData," apiData")

    if (apiData.success) {
      yield put(saveActivitySuccess(apiData));
    } else if (!apiData.success) {
      yield put(codeErrorAction(data));
    }
  } catch (err) {
    yield put(codeErrorAction(err));
    // console.log("api failed");
    console.log(err)
  }
}

export function* loadActivity() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    console.log(headers," ddsnfjdsfjkdsfjkdsfjkdsjfkdsjkfjksdfjksdf")
   //  const saveActivityLogs = yield select(makeSelectSaveActivity());
   //
   // const body = {
   //   saveActivityLogs:saveActivityLogs.saveActivityLogs
   // }
   // console.log(body," body in saga");
    // const apiData = yield call(api.user.loadActivityStatus, headers, body);
    // console.log(apiData," apiData")

  //   if (apiData.success) {
  //     yield put(loadActivitySuccess(apiData));
  //   } else if (!apiData.success) {
  //     yield put(codeErrorAction(data));
  //   }
  } catch (err) {
    yield put(codeErrorAction(data));
    // console.log("api failed");
    console.log(err)
  }
}


export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  // See example in containers/HomePage/saga.js
  yield [takeLatest(ENABLE_2FA, securityChanged),
    takeLatest(VERIFY_2FA, verify2fa),
    takeLatest(DISABLE_2FA, disabling2fa),
    takeLatest(SAVE_ACTIVITY, saveActivity),
    takeLatest(LOAD_ACTIVITY_STATUS, loadActivity),

  ];
}
