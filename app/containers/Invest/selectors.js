import { createSelector } from 'reselect';

/**
 * Direct selector to the investPage state domain
 */
const selectInvestPageDomain = (state) => state.get('investPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by InvestPage
 */

const makeSelectInvestPage = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.toJS()
);
const makeSelectContributionCurrency = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('currency')
);
const makeSelectContributionData = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('success').toJS()
);

const makeSelectContributionConfirm = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentConfirm').toJS()
);

const makeSelectAddCenxWallet = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('ethWallet').toJS()
);

const makeSelectContributionSuccess = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentSuccess')
);
const makeSelectContributionNotSuccess = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentNotSuccess')
);
const makeSelectPaymentId = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectFinalTransaction = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('finalConfirm').toJS()
);

const makeSelectContributionFailure = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentFailure')
);

const makeSelectTransactionId = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectLoading = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('loading')
);

const makeSelectGetHotWallet = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('listHotWallet')
)

const makeSelectGetHotWalletRet = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('listHotWalletRet')
)

const makeSelectGetHotWalletLoading = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('listHotWalletLoading')
)

const makeSelectWalletAddedSuccess = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('walletAddedSuccess')
)
const makeSelectWalletFetchedSuccess = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('walletFetchedSuccess')
)
const makeSelectWalletNotAdded = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('walletNotAddedSuccess')
)
const makeSelectCreateHotWallet = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('createHotWallet')
)

const makeSelectCreateHotWalletRet = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('createHotWalletRet')
)

const makeSelectCreateHotWalletLoading = () => createSelector(
  selectInvestPageDomain,
  (substate) => substate.get('createHotWalletLoading')
)

export default makeSelectInvestPage;
export {
  selectInvestPageDomain,
  makeSelectContributionCurrency,
  makeSelectContributionData,
  makeSelectContributionConfirm,
  makeSelectContributionFailure,
  makeSelectContributionSuccess,
  makeSelectContributionNotSuccess,
  makeSelectPaymentId,
  makeSelectFinalTransaction,
  makeSelectTransactionId,
  makeSelectLoading,
  makeSelectGetHotWallet,
  makeSelectGetHotWalletRet,
  makeSelectGetHotWalletLoading,
  makeSelectCreateHotWallet,
  makeSelectCreateHotWalletRet,
  makeSelectCreateHotWalletLoading,
  makeSelectAddCenxWallet,
  makeSelectWalletAddedSuccess,
  makeSelectWalletNotAdded,
  makeSelectWalletFetchedSuccess
};
