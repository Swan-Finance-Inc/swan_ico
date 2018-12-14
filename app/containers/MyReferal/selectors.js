import { createSelector } from 'reselect';

/**
 * Direct selector to the myReferal state domain
 */
const selectMyReferalDomain = (state) => state.get('myReferal');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MyReferal
 */

const makeSelectMyReferal = () => createSelector(
  selectMyReferalDomain,
  (substate) => substate.toJS()
);
const makeSelectMyReferalloading = () => createSelector(
  selectMyReferalDomain,
  (substate) => substate.get('loading')
);
const makeSelectMyReferalData = () => createSelector(
  selectMyReferalDomain,
  (substate) => substate.get('referData')
);


export default makeSelectMyReferal;
export {
  selectMyReferalDomain,
  makeSelectMyReferalloading,
  makeSelectMyReferalData,
};
