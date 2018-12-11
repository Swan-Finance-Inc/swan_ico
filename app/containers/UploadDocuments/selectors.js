import { createSelector } from 'reselect';

/**
 * Direct selector to the uploadDocuments state domain
 */
const selectUploadDocumentsDomain = (state) => state.get('uploadDocuments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UploadDocuments
 */

const makeSelectUploadDocuments = () => createSelector(
  selectUploadDocumentsDomain,
  (substate) => substate.toJS()
);
const makeSelectKycDoc = () => createSelector(
  selectUploadDocumentsDomain,
  (substate) => substate.get('kycDoc')
)

export default makeSelectUploadDocuments;
export {
  selectUploadDocumentsDomain,
  makeSelectKycDoc
};
