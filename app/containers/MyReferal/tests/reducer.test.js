
import { fromJS } from 'immutable';
import myReferalReducer from '../reducer';

describe('myReferalReducer', () => {
  it('returns the initial state', () => {
    expect(myReferalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
