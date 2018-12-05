import { createSelector } from 'reselect';

/**
 * Direct selector to the unsubscribe state domain
 */
const selectUnsubscribeDomain = (state) => state.get('unsubscribe');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Unsubscribe
 */

 const makeSelectUnsubscribe = () => createSelector(
   selectProfilePageDomain,
   (substate) => substate.toJS()
 );

const selectUnsubscribeDetails = () => createSelector(
  selectUnsubscribeDomain,
  (substate) => substate.get('data')
);

export default makeSelectUnsubscribe;
export {
  selectUnsubscribeDetails,
};
