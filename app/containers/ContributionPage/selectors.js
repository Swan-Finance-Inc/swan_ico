import { createSelector } from 'reselect';

/**
 * Direct selector to the contributionPage state domain
 */
const selectContributionPageDomain = (state) => state.get('contributionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContributionPage
 */

const makeSelectContributionPage = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.toJS()
);
const makeSelectContributionCurrency = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('currency')
);
const makeSelectContributionData = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('success').toJS()
);

const makeSelectContributionConfirm = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentConfirm').toJS()
);

const makeSelectContributionSuccess = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentSuccess')
);
const makeSelectContributionNotSuccess = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentNotSuccess')
);
const makeSelectPaymentId = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectFinalTransaction = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('finalConfirm').toJS()
);

const makeSelectContributionFailure = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentFailure')
);

const makeSelectTransactionId = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectLoading = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('loading')
);

const makeSelectGetHotWallet = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('listHotWallet')
)

const makeSelectGetHotWalletRet = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('listHotWalletRet')
)

const makeSelectGetHotWalletLoading = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('listHotWalletLoading')
)

const makeSelectCreateHotWallet = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('createHotWallet')
)

const makeSelectCreateHotWalletRet = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('createHotWalletRet')
)

const makeSelectCreateHotWalletLoading = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('createHotWalletLoading')
)

export default makeSelectContributionPage;
export {
  selectContributionPageDomain,
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
  makeSelectCreateHotWalletLoading
};
