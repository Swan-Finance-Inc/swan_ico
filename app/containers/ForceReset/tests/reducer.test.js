
import { fromJS } from 'immutable';
import forceResetReducer from '../reducer';

describe('forceResetReducer', () => {
  it('returns the initial state', () => {
    expect(forceResetReducer(undefined, {})).toEqual(fromJS({}));
  });
});
