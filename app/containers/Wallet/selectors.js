import { createSelector } from 'reselect';
import { create } from 'lodash';

/**
 * Direct selector to the walletPage state domain
 */
const selectWalletPageDomain = (state) => state.get('walletPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WalletPage
 */

const makeSelectWalletPage = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.toJS()
);
const makeSelectContributionCurrency = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('currency')
);
const makeSelectContributionData = () => createSelector(
  selectWalletPageDomain, 
  (substate) => substate.get('success').toJS()
);

const makeSelectContributionConfirm = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentConfirm').toJS()
);

const makeSelectAddCenxWallet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('ethWallet').toJS()
);

const makeSelectContributionSuccess = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentSuccess')
);
const makeSelectContributionNotSuccess = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentNotSuccess')
);
const makeSelectPaymentId = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectFinalTransaction = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('finalConfirm').toJS()
);

const makeSelectContributionFailure = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentFailure')
);

const makeSelectTransactionId = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectLoading = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('loading')
);

const makeSelectGetHotWallet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('listHotWallet')
)

const makeSelectGetHotWalletRet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('listHotWalletRet')
)

const makeSelectGetHotWalletLoading = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('listHotWalletLoading')
)

const makeSelectWalletAddedSuccess = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('walletAddedSuccess')
)
const makeSelectWalletFetchedSuccess = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('walletFetchedSuccess')
)
const makeSelectWalletNotAdded = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('walletNotAddedSuccess')
)
const makeSelectCreateHotWallet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('createHotWallet')
)

const makeSelectCreateHotWalletRet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('createHotWalletRet')
)

const makeSelectCreateHotWalletLoading = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('createHotWalletLoading')
)

const makeSelectGetOtp = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('otpdata')
)
const makeSelectSendWithdraw = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('withDrawlData').toJS()
)
const makeSelectSendWithdrawRet = () => createSelector(
  selectWalletPageDomain,
  (substate) => substate.get('sendWithdrawlRet')
)

export default makeSelectWalletPage;
export {
  selectWalletPageDomain,
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
  makeSelectWalletFetchedSuccess,
  makeSelectGetOtp,
  makeSelectSendWithdrawRet,
  makeSelectSendWithdraw 
};
