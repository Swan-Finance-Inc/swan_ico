import { createSelector } from 'reselect';

/**
 * Direct selector to the activity state domain
 */
const selectActivityDomain = (state) => state.get('activity');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Activity
 */

const makeSelectActivity = () => createSelector(
  selectActivityDomain,
  (substate) => substate.toJS()
);


const makeSelectLoading = () => createSelector(
  selectActivityDomain,
  (substate) => substate.get('loading')
);
const makeSelectLogs = () => createSelector(
  selectActivityDomain,
  (substate) => substate.get('logs')
);
export default makeSelectActivity;
export {
  selectActivityDomain,
  makeSelectLoading,
  makeSelectLogs
};
