import api from 'utils/api';
import { push } from 'react-router-redux';
import { depositSuccess } from 'containers/App/actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_LOGS} from './constants';
import { loadSuccess  } from './actions';
import { } from './selectors';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'
export function* loadLogs() {
  try {
   // console.log('listening');
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.getActivityLogs, headers);
   console.log(apiData," in get data saga");
    if (apiData.success) {
      console.log(apiData.data,"in saga");
      yield put(loadSuccess(apiData.data));
    }else{
      yield put(codeErrorAction());
    }
  } catch (error) {
console.log(error);
   yield put(codeErrorAction());
  }
}



export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield [
    takeLatest(LOAD_LOGS, loadLogs),

  ];
}
