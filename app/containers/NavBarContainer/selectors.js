import { createSelector } from 'reselect';

/**
 * Direct selector to the navBarContainer state domain
 */
const selectNavBarContainerDomain = (state) => state.get('navBarContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NavBarContainer
 */

const makeSelectNavBarContainer = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.toJS()
);
const makeSelectDetails = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('details')
)
const makeSelectProfileImage = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('profileimg')
)

const makeSelectUpdateSuccess = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('updateSuccess')
)
const makeSelectImageReturn = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('profileimgRet')
)

const makeSelectUserInfo = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('userInfo')
)
const makeSelectLoading = () => createSelector(
  selectNavBarContainerDomain,
  (substate) => substate.get('loading')
)
export default makeSelectNavBarContainer;
export {
  selectNavBarContainerDomain,
  makeSelectDetails,
  makeSelectUpdateSuccess,
  makeSelectProfileImage,
  makeSelectImageReturn,
  makeSelectUserInfo,
  makeSelectLoading
};
