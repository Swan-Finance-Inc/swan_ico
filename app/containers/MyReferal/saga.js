import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import api from 'utils/api';
import { GET_REFERAL_DATA } from './constants';
import {  } from './selectors';
import { getReferSuccess } from './actions';
import { push } from 'react-router-redux';
import { codeErrorAction,codeErrorRemove } from '../DashBoardWelcomePage/actions'


export function* getReferalData() {
  try {
    console.log(" inside the saga of referals ")
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token')
        },
    };
    const apiData = yield call(api.user.getReferData, headers);
    console.log(apiData)
    if(apiData.success){
      console.log(" in success")
        yield put(getReferSuccess(apiData))
    }else{
      console.log('from saga', apiData);
    }
  }catch(err){
    yield put(codeErrorAction(err))
    yield put(codeErrorRemove(err))
  }
}



export default function* defaultSaga() {
  yield [
    takeEvery(GET_REFERAL_DATA, getReferalData)
  ];
}
