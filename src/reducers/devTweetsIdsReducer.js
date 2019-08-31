import { DEV_TWEETS } from '../constants';

export default (state = [], { type, payload }) => {
  switch (type) {
    case DEV_TWEETS.FETCH_SUCCESS:
      return [...state, ...payload.mostFavoriteTweetIds];

    default:
      return state;
  }
};
