import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { successTransactions } from './actions';
import { makeSelectPage, makeSelectTransType, makeSelectMinCreated, makeSelectMaxCreated } from './selectors';
import { GET_TRANSACTIONS } from './constants';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'
export function* getTransaction() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const page = yield select(makeSelectPage());
    let type = yield select(makeSelectTransType());
    let ll  = yield select(makeSelectMinCreated());
    let ul = yield select(makeSelectMaxCreated());
    console.log(type, " type in saga of transactions");
    console.log(page, " page in saga of transactions");

    const apiData = yield call(api.user.fetchUserTransactions, headers, page, type, ll, ul);
    if (apiData.success) {
      yield put(successTransactions(apiData));
    }
  } catch (error) {
    yield put(codeErrorAction());
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TRANSACTIONS, getTransaction);
}
