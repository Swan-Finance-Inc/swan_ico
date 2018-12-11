
import { fromJS } from 'immutable';
import uploadDocumentsReducer from '../reducer';

describe('uploadDocumentsReducer', () => {
  it('returns the initial state', () => {
    expect(uploadDocumentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
