import { createSelector } from 'reselect';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = (state) => state.get('profilePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.toJS()
);

const makeSelectDetails = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('details')
)
const makeSelectProfileImage = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('profileimg')
)

const makeSelectUpdateSuccess = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('updateSuccess')
)
const makeSelectImageReturn = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('profileimgRet')
)
export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectDetails,
  makeSelectUpdateSuccess,
  makeSelectProfileImage,
  makeSelectImageReturn
};
