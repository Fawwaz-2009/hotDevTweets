import { DEV_TWEETS } from '../constants';
export default (state = false, { type, payload }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
      return payload.isNoMoreDev;

    default:
      return state;
  }
};
