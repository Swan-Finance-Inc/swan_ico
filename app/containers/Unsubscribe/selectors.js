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
  selectUnsubscribeDomain,
  (substate) => substate.toJS()
);

export default makeSelectUnsubscribe;
export {
  selectUnsubscribeDomain,
};
