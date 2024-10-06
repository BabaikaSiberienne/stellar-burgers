import { rootReducer } from './RootReducer';
import store from '../../services/store';
import { expect, test } from '@jest/globals';

describe('rootReducer', () => {
  const startState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  test('rootReducer return correct startState', () => {
    expect(startState).toEqual(store.getState());
  });
});
