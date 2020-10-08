import { createSelector } from 'reselect';

/**
 * Direct selector to the dashBoardWelcomePage state domain
 */
const selectDashBoardWelcomePageDomain = (state) => state.get('dashBoardWelcomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashBoardWelcomePage
 */

const makeSelectDashBoardWelcomePage = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.toJS()
);

const makeSelectSocial = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('socialDetails')
)

const makeSelectIsInfoActive = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('socialDetails')
)

const makeSelectKycDone = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('kycDone')
)
const makeSelectErrorGlobal = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('errorGlobal')
)
const makeSelectFaqData = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('faqData')
)
const makeSelectNewsData = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('newsData')
)

const makeSelectAnnouncementsData = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('announcementsData')
)

const makeSelectToggleInfoActive = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('toggleInfoActive')
)

const makeSelectGetCrowdsaleData = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('getCrowdsaleData')
)

const makeSelectGetCrowdsaleDataRet = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('getCrowdsaleDataRet')
)

const makeSelectGetReferralsEarned = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('getReferralsEarned')
)
const makeSelectGetReferralsEarnedRet = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('getReferralsEarnedRet')
)

const makeSelectGetCrowdsaleDataLoading = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('getCrowdsaleDataLoading')
)


export default makeSelectDashBoardWelcomePage;
export {
  selectDashBoardWelcomePageDomain,
  makeSelectSocial,
  makeSelectKycDone,
  makeSelectErrorGlobal,
  makeSelectFaqData,
  makeSelectNewsData,
  makeSelectAnnouncementsData,
  makeSelectToggleInfoActive,
  makeSelectGetCrowdsaleData,
  makeSelectGetCrowdsaleDataRet,
  makeSelectGetCrowdsaleDataLoading,
  makeSelectGetReferralsEarned,
  makeSelectGetReferralsEarnedRet
};
