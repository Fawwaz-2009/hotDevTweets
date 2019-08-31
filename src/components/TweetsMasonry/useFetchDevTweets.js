import { useEffect } from 'react';

import { fetchDevTweets } from '../../actions';

const useFetchDevTweets = (useSelector, useDispatch) => {
  const { devTweetsIds } = useSelector(({ devTweetsIds }) => ({
    devTweetsIds
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDevTweets());

    return () => {};
  }, []);

  return devTweetsIds;
};

export default useFetchDevTweets;
