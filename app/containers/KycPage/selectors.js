import { createSelector } from 'reselect';

/**
 * Direct selector to the kycPage state domain
 */
const selectKycPageDomain = (state) => state.get('kycPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by KycPage
 */

const makeSelectKycPage = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.toJS()
);

const makeSelectKycDetails = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('kycDetails')
)

const makeSelectSubmitKycSuccess = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('submitKycSuccess')
)
const makeSelectSubmitKycFractal = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('fractalKYC')
)


const makeSelectKycDoc = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('kycDoc')
)
const makeSelectUpdateKycFractal = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('updateFractal')
)
const makeSelectUpdateKycFractalSuccess = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('updateFractalSuccess')
)
export default makeSelectKycPage;
export {
  selectKycPageDomain,
  makeSelectKycDetails,
  makeSelectSubmitKycSuccess,
  makeSelectKycDoc,
  makeSelectSubmitKycFractal,
  makeSelectUpdateKycFractal,
  makeSelectUpdateKycFractalSuccess
};
