import { DEV_TWEETS } from '../constants';

export default (state = true, { type }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
    case DEV_TWEETS.FETCH_FAIL:
      return false;
    case DEV_TWEETS.FETCH:
      return true;
    default:
      return state;
  }
};
