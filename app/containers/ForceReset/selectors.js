import { createSelector } from 'reselect';

/**
 * Direct selector to the forceReset state domain
 */
const selectForceResetDomain = (state) => state.get('forceReset');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ForceReset
 */

const makeSelectForceReset = () => createSelector(
  selectForceResetDomain,
  (substate) => substate.toJS()
);

export default makeSelectForceReset;
export {
  selectForceResetDomain,
};
