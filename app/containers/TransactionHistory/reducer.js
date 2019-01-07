/*
 *
 * TransactionHistory reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, GET_TRANSACTIONS, SUCCESS_TRANSACTIONS,
} from './constants';

const initialState = fromJS({
  transactions: [],
  page: '',
  nextPage: false,
  loading:false,
  type:'',
  minCreatedAt:'',
  maxCreatedAt:''
});

function transactionHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUCCESS_TRANSACTIONS:
      return state
        .set('loading',false)
        .set('transactions', action.data.transactions)
        .set('nextPage', action.data.nextPage);
    case GET_TRANSACTIONS:
      return state
        .set('loading',true)
        .set('page', action.data.page)
        .set('type',action.data.type?action.data.type:'')
        .set('minCreatedAt',action.data.createdLl?action.data.createdLl:'')
        .set('maxCreatedAt',action.data.createdUl?action.data.createdUl:'')
    default:
      return state;
  }
}

export default transactionHistoryReducer;
