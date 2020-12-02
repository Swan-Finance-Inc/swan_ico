/*
 *
 * InvestPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SELECT_ACTION,
  GET_DATA,
  SUCCESS_DATA,
  FAILURE_DATA,
  CONFIRM_PAYMENT,
  SUCCESS_PAYMENT,
  NOT_SUCCESS_PAYMENT,
  FAILURE_PAYMENT, REMOVE_PAYMENT_FAILURE, REMOVE_PAYMENT_SUCCESS, SEND_PAYMENT, SUCCESS_SEND_PAYMENT,
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
  WALLET_FETCHED,
  GET_CENX_WALLET
} from './constants';

const initialState = fromJS({
  loading:false,
  currency: 'ethereum',
  getData: false,
  success: {
    tokenUsd: false,
    ethUsd: false,
    btcUsd: false,
    ethAddress: false,
    btcAddress: false,
    bonus: false,
    stage: false,
    minInvest: false,
    tokenPerEther: 0,
    tokenPerBtc: 0,

  },
  failure: false,
  paymentConfirm: {
    tokens: false,
    type: false,
    amount: false,
    fromAddress: false,
    toAddress: false,
    tokenReceivingAddress: false,
    usdAmount: false,
    transactionHash: false,
    tokenPrice:0
  },
  ethWallet:{
    publicKey: false,
    privateKey: false,
    balance:0
  },
  paymentSuccess: false,
  paymentNotSuccess : false,
  paymentFailure: false,
  paymentId: false,
  paymentSentSuccess: false,
  finalConfirm:{
    transactionId: false,
    transactionHash: false,
  },
  listHotWallet:false,
  listHotWalletRet:false,
  listHotWalletLoading:false,

  createHotWallet:false,
  createHotWalletRet:false,
  createHotWalletLoading:false,
  walletNotAddedSuccess: false,
  walletAddedSuccess: false,
  walletFetchedSuccess:false

});

function investPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_ACTION:
      return state
        .set('currency', action.data);
    case GET_DATA:
      return state
        .set('loading', true)
        .set('getData', true);
    case CONFIRM_PAYMENT:
      return state
        .setIn(['paymentConfirm', 'tokens'], action.data.tokens)
        .setIn(['paymentConfirm', 'type'], action.data.type)
        .setIn(['paymentConfirm', 'amount'], action.data.amount)
        .setIn(['paymentConfirm', 'fromAddress'], action.data.fromAddress)
        .setIn(['paymentConfirm', 'toAddress'], action.data.toAddress)
        .setIn(['paymentConfirm', 'tokenReceivingAddress'], action.data.tokenReceivingAddress)
        .setIn(['paymentConfirm', 'usdAmount'], action.data.usdAmount)
        .setIn(['paymentConfirm', 'rate'], action.data.rate)
        .setIn(['paymentConfirm', 'phase'], action.data.phase)
        .setIn(['paymentConfirm', 'transactionHash'], action.data.transactionHash)
        .setIn(['paymentConfirm', 'tokenPrice'], action.data.tokenPrice)
        .setIn(['paymentConfirm', 'bonus'], action.data.bonus)
        .setIn(['paymentConfirm', 'discount'], action.data.discount)
        .setIn(['paymentConfirm', 'isBonusOrDiscount'], action.data.isBonusOrDiscount);
    case ADD_CENX_WALLET:
      return state
        .setIn(['ethWallet', 'publicKey'], action.data.publicKey)
        .setIn(['ethWallet', 'privateKey'], action.data.privateKey)
        .setIn(['ethWallet', 'balance'], action.data.balance)
    case GET_CENX_WALLET:
      return state
        .set('getCenxWallet', true)

    case SUCCESS_DATA:
      return state
        .set('loading', false)
        .setIn(['success', 'tokenUsd'], action.data.tokenUsd)
        .setIn(['success', 'ethUsd'], action.data.ethUsd)
        .setIn(['success', 'btcUsd'], action.data.btcUsd)
        .setIn(['success', 'eurUsd'], action.data.eurUsd)
        .setIn(['success', 'ethAddress'], action.data.ethAddress)
        .setIn(['success', 'btcAddress'], action.data.btcAddress)
        .setIn(['success', 'bonus'], action.data.bonus)
        .setIn(['success', 'stage'], action.data.stage)
        .setIn(['success', 'minInvest'], action.data.minInvest)
        .setIn(['success', 'privateSaleTokenUsd'], action.data.privateSaleTokenUsd)
        .setIn(['success', 'discountSaleTokenUsd'], action.data.discountSaleTokenUsd)
        .setIn(['success', 'mainSaleTokenUsd'], action.data.mainSaleTokenUsd)
        .setIn(['success', 'tokenPerEther'], action.data.tokenPerEther)
        .setIn(['success', 'tokenPerBtc'], action.data.tokenPerBtc)
        .setIn(['success', 'isBonusOrDiscount'], action.data.isBonusOrDiscount)
        .setIn(['success', 'discount'], action.data.staticDiscount)
        .set('failure', false);
    case SUCCESS_PAYMENT:
      return state
        .set('paymentSuccess', action.data.success)
        .set('paymentId', action.data.transactionId)
        .set('paymentFailure', false);
    case NOT_SUCCESS_PAYMENT:
      return state
        .set('paymentNotSuccess', action.data)
        .set('paymentFailure', false);
    case WALLET_NOT_ADDED:
      return state
        .set('walletNotAddedSuccess', action.data)
        .set('paymentFailure', false);
    case WALLET_ADDED:
      return state
        .set('walletAddedSuccess', action.data)
        .set('paymentFailure', false);

    case WALLET_FETCHED:
      return state
        .set('walletFetchedSuccess', action.data)
        .set('paymentFailure', false);
    case FAILURE_PAYMENT:
      return state
        .set('paymentSuccess', false)
        .set('paymentFailure', action.data);
    case REMOVE_PAYMENT_SUCCESS:
      return state
        .set('paymentSuccess', false);

    case REMOVE_PAYMENT_FAILURE:
      return state
        .set('paymentFailure', false);
    case FAILURE_DATA:
      return state
        .set('loading', false)
        .set('failure', true);
    case SEND_PAYMENT:
      return state
        .setIn(['finalConfirm', 'transactionId'], action.data.transactionId)
        .setIn(['finalConfirm', 'transactionHash'], action.data.transactionHash);

    case SUCCESS_SEND_PAYMENT:
      return state
        .set('paymentSentSuccess', action.data);

        case LIST_HOT_WALLET:
          return state
            .set('listHotWallet', action.data)
            .set('listHotWalletLoading',true)
        case LIST_HOT_WALLET_RET:
          return state  
          .set('listHotWalletRet', action.data)
          .set('listHotWalletLoading',false)
        case LIST_HOT_WALLET_LOADING:
          return state
          .set('listHotWalletLoading',false)
          case CREATE_HOT_WALLET:
            return state
              .set('createHotWallet', action.data)
              .set('createHotWalletLoading',true)
          case CREATE_HOT_WALLET_RET:
            return state  
            .set('createHotWalletRet', action.data)
            .set('createHotWalletLoading',false)
          case CREATE_HOT_WALLET_LOADING:
            return state
            .set('createHotWalletLoading',false)
          case CLEAR_CONTRIBUTION:
            return state
            .set('createHotWalletRet',false)
            .set('listHotWalletRet',false)
            .set('paymentNotSuccess', false)
            .set('walletAddedSuccess', false)
            .set('walletNotAddedSuccess', false)
            .set('walletFetchedSuccess', false)
    default:
      return state;
  }
}

export default investPageReducer;
