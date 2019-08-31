import { takeEvery, take, call, put, race, delay, select } from 'redux-saga/effects';

import { DEV_TWEETS } from '../constants';
import * as Actions from '../actions';
import fetchDevTweets from '../API';

// -------------- Handlers -----------------
function* callAfter(delayTime, callback) {
  yield delay(delayTime);
  yield call(callback);
}
function* loadMoreTweets() {
  yield take(DEV_TWEETS.FETCH);
  yield put(Actions.removeNotifier());
}
function* handleTweetFetch() {
  try {
    const cursor = yield select(state => state.cursor);
    const { mostFavoriteTweetIds, newCursor, isNoMoreDev } = yield call(fetchDevTweets, cursor);

    yield put(Actions.fetchDevTweetsSuccess({ mostFavoriteTweetIds, newCursor, isNoMoreDev }));
    yield race({
      loadMoreTweets: call(loadMoreTweets),
      removeNotifier: call(callAfter, 3000, function*() {
        yield put(Actions.removeNotifier());
      })
    });
  } catch (error) {
    yield put(Actions.fetchDevTweetsFail(error));
  }
}

// ------------------ Watchers ------------------
function* rootSaga() {
  yield takeEvery(DEV_TWEETS.FETCH, handleTweetFetch);
}

export default rootSaga;
export { handleTweetFetch, callAfter, loadMoreTweets };
