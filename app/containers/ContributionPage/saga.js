import api from 'utils/api';
import { push } from 'react-router-redux';
import { depositSuccess } from 'containers/App/actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_DATA, CONFIRM_PAYMENT, RELOAD_PAGE, SEND_PAYMENT ,LIST_HOT_WALLET,CREATE_HOT_WALLET } from './constants';
import { successData, successPayment, successFinalizePayment ,listHotWalletRet,
  listHotWalletLoading, createHotWalletRet,createHotWalletLoading  } from './actions';
import { makeSelectContributionConfirm, makeSelectFinalTransaction ,makeSelectGetHotWallet,
  makeSelectCreateHotWallet
} from './selectors';
import { codeErrorAction } from '../DashBoardWelcomePage/actions'
export function* getData() {
  try {
   // console.log('listening');
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.getContributionData, headers);
   console.log(apiData," in get data saga");
    if (apiData.success) {
      console.log(apiData.data,"in saga");
      yield put(successData(apiData.data));
    }else{
      yield put(codeErrorAction());
    }
  } catch (error) {
   // console.log(error);
   yield put(codeErrorAction());
  }
}

export function* contribute() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const body = yield select(makeSelectContributionConfirm());
    console.log(body," our body in contribute saga")
    const apiData = yield call(api.user.deposit, headers, body);
    console.log(apiData,"apiData in user.deposit")
    if (apiData.success) {
      yield put(depositSuccess(true));
      yield put(successFinalizePayment(true));
      yield put(push('/dashboard/transactionHistory'));
      yield put(successPayment(apiData));
    }else{
      yield put(codeErrorAction());
    }
  } catch (error) {
     yield put(codeErrorAction());
  console.log(error)
 }
}
export function* finalPayment() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const body = yield select(makeSelectFinalTransaction());
    console.log(body,"  body in Final Payment     ")
    const apiData = yield call(api.user.depositWithHash, headers, body);
    if (apiData.success) {
      yield put(successFinalizePayment(true));
      yield put(push('/dashboard/transactionHistory'));
      yield put(successPayment(apiData));
    }else {
      yield put(codeErrorAction());
    }
  } catch (error) {
 yield put(codeErrorAction());
 }
}
export function* reloadMe() {
  yield put(push('/dashboard'));
}


export function* listHotWalletSaga() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const data = yield select(makeSelectGetHotWallet());

    const apiData = yield call(api.user.getHotWallet, headers);
    if(apiData) {
      yield put(listHotWalletRet(apiData));
      yield put(listHotWalletLoading(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}


export function* createHotWalletSaga() {
  try {

    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const data = yield select(makeSelectCreateHotWallet());

    const apiData = yield call(api.user.createHotWallet, headers,data);
    if(apiData) {
      yield put(createHotWalletRet(apiData));
      yield put(createHotWalletLoading(apiData));
    }
  }
  catch (err) {
    console.log('error in load profile', err);
      yield put(codeErrorAction());
  }
}


export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield [takeLatest(GET_DATA, getData),
    takeLatest(CONFIRM_PAYMENT, contribute),
    takeLatest(RELOAD_PAGE, reloadMe),
    takeLatest(SEND_PAYMENT, finalPayment),
    takeLatest(LIST_HOT_WALLET, listHotWalletSaga),
    takeLatest(CREATE_HOT_WALLET, createHotWalletSaga)

  ];
}
