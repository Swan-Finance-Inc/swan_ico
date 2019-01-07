
import { fromJS } from 'immutable';
import activityReducer from '../reducer';

describe('activityReducer', () => {
  it('returns the initial state', () => {
    expect(activityReducer(undefined, {})).toEqual(fromJS({}));
  });
});
