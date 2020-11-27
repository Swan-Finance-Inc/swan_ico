/*
 *
 * WalletPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SELECT_ACTION,
  SUCCESS_DATA,
  FAILURE_DATA,
  GET_DATA,
  CONFIRM_PAYMENT,
  SUCCESS_PAYMENT,
  NOT_SUCCESS_PAYMENT,
  FAILURE_PAYMENT,
  REMOVE_PAYMENT_FAILURE,
  REMOVE_PAYMENT_SUCCESS,
  RELOAD_PAGE,
  SEND_PAYMENT,
  SUCCESS_SEND_PAYMENT,
  LIST_HOT_WALLET,
  LIST_HOT_WALLET_RET,
  LIST_HOT_WALLET_LOADING,
  CREATE_HOT_WALLET,
  CREATE_HOT_WALLET_RET,
  CREATE_HOT_WALLET_LOADING,
  CLEAR_CONTRIBUTION,
  ADD_CENX_WALLET,
  WALLET_ADDED,
  WALLET_NOT_ADDED,
  GET_CENX_WALLET,
  WALLET_FETCHED
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function selectAction(data) {
  return {
    type: SELECT_ACTION,
    data,
  };
}
export function getData() {
  return {
    type: GET_DATA,
  };
}

export function confirmPayment(data) {
  return {
    type: CONFIRM_PAYMENT,
    data,
  };
}

export function addCenxWallet(data) {
  return {
    type: ADD_CENX_WALLET,
    data,
  };
}
export function getCenxWallet(data) {
  return {
    type: GET_CENX_WALLET,
  };
}

export function walletFetched(data) {
  return {
    type: WALLET_FETCHED,
    data,
  };
}
export function successData(data) {
  return {
    type: SUCCESS_DATA,
    data,
  };
}
export function failureData(token) {
  return {
    type: FAILURE_DATA,
    token,
  };
}

export function successPayment(data) {
  return {
    type: SUCCESS_PAYMENT,
    data,
  };
}
export function notSuccessPayment(data) {
  return {
    type: NOT_SUCCESS_PAYMENT,
    data,
  };
}

export function walletAdded(data) {
  return {
    type: WALLET_ADDED,
    data,
  };
}
export function walletNotAdded(data) {
  return {
    type: WALLET_NOT_ADDED,
    data,
  };
}
export function failurePayment(data) {
  return {
    type: FAILURE_PAYMENT,
    data,
  };
}
export function removeSuccessPayment() {
  return {
    type: REMOVE_PAYMENT_SUCCESS,
  };
}
export function removeFaiurePayment() {
  return {
    type: REMOVE_PAYMENT_FAILURE,
  };
}

export function reload() {
  return {
    type: RELOAD_PAGE,
  };
}

export function finalizePayment(data) {
  return {
    type: SEND_PAYMENT,
    data,
  };
}
export function successFinalizePayment(data) {
  return {
    type: SUCCESS_SEND_PAYMENT,
    data,
  };
}

export function listHotWallet(data){
  return {
    type: LIST_HOT_WALLET,
    data
  }
}

export function listHotWalletRet(data){
  return {
    type: LIST_HOT_WALLET_RET,
    data
  }
}
export function listHotWalletLoading(data){
  return {
    type: LIST_HOT_WALLET_LOADING,
    data
  }
}

export function createHotWallet(data){
  return {
    type: CREATE_HOT_WALLET,
    data
  }
}

export function createHotWalletRet(data){
  return {
    type: CREATE_HOT_WALLET_RET,
    data
  }
}
export function createHotWalletLoading(data){
  return {
    type: CREATE_HOT_WALLET_LOADING,
    data
  }
}

export function clearContribution(data){
  return {
    type: CLEAR_CONTRIBUTION
  }
}


