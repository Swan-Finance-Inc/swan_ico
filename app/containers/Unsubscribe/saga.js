import api from 'utils/api';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { UNSUBSCRIBE_USER_ACTION } from './constants';
import { unsubscribeUserAction ,unsubscribeUserActionSuccess, unsubscribeUserActionSuccessClear } from './actions';
import { selectUnsubscribeDetails } from './selectors';


export function* unsubscribeUserSaga() {
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    // Need to pass email
    const data = yield select(selectUnsubscribeDetails());
    console.log("data details : ", data);

    // const data = yield select(makeSelectDetails());
    // console.log("Data : ", data);

    const apiData = yield call(api.user.unSubscribeUser, headers, data.email);

    if(apiData.success){
      yield put(unsubscribeUserActionSuccess())
      console.log("Unsubscribed successfully");
      yield put(unsubscribeUserActionSuccessClear());
    }
  }catch(err){
    console.log(err)
  }
}

export default function* defaultSaga() {
  yield [
    takeLatest(UNSUBSCRIBE_USER_ACTION, unsubscribeUserSaga),
  ];
}
