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

const makeSelectUserInfo = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('userInfo')
)
const makeSelectLoading = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('loading')
)
export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectDetails,
  makeSelectUpdateSuccess,
  makeSelectProfileImage,
  makeSelectImageReturn,
  makeSelectUserInfo,
  makeSelectLoading
};
