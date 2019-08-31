import { DEV_TWEETS, NOTIFIER } from '../constants';
export default (state = false, { type, payload }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
    case DEV_TWEETS.FETCH_FAIL:
      return true;

    case DEV_TWEETS.FETCH:
    case NOTIFIER.REMOVE:
      return false;

    default:
      return state;
  }
};
