import { DEV_TWEETS, NOTIFIER } from '../constants';

const fetchDevTweets = () => ({
  type: DEV_TWEETS.FETCH
});

const fetchDevTweetsSuccess = payload => ({
  type: DEV_TWEETS.FETCH_SUCCESS,
  payload
});

const fetchDevTweetsFail = error => ({
  type: DEV_TWEETS.FETCH_FAIL,
  error
});

const removeNotifier = () => ({ type: NOTIFIER.REMOVE });

export { fetchDevTweets, fetchDevTweetsSuccess, fetchDevTweetsFail, removeNotifier };
