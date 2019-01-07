import { createSelector } from 'reselect';

/**
 * Direct selector to the transactionHistory state domain
 */
const selectTransactionHistoryDomain = (state) => state.get('transactionHistory');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TransactionHistory
 */

const makeSelectTransactionHistory = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.toJS()
);
const makeSelectTransactions = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('transactions')
);
const makeSelectPage = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('page')
);

const makeSelectNextPage = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('nextPage')
);
const makeSelectTransLoading = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('loading')
);
const makeSelectTransType = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('type')
);
const makeSelectMinCreated = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('minCreatedAt')
);
const makeSelectMaxCreated = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('maxCreatedAt')
);





export default makeSelectTransactionHistory;
export {
  selectTransactionHistoryDomain,
  makeSelectTransactions,
  makeSelectPage,
  makeSelectNextPage,
  makeSelectTransLoading,
  makeSelectTransType,
  makeSelectMinCreated,
  makeSelectMaxCreated
};
