import { DEV_TWEETS } from '../constants';

export default (state = 0, { type, payload }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
      return payload.newCursor;

    default:
      return state;
  }
};
