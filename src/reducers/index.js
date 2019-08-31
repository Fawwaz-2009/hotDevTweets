import { combineReducers } from 'redux';

import devTweetsIdsReducer from './devTweetsIdsReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import notifyingReducer from './notifyingReducer';
import NoMoreDevReducer from './NoMoreDevReducer';
import cursorReducer from './cursorReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  error: errorReducer,
  devTweetsIds: devTweetsIdsReducer,
  isNoMoreDev: NoMoreDevReducer,
  isNotifying: notifyingReducer,
  cursor: cursorReducer
});

export default rootReducer;
