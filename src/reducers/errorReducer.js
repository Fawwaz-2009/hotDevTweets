import { DEV_TWEETS } from '../constants';

export default (state = null, { type, error }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
    case DEV_TWEETS.FETCH:
      return null;
    case DEV_TWEETS.FETCH_FAIL:
      return error;
    default:
      return state;
  }
};
