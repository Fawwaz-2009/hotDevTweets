import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useFetchDevTweets from './useFetchDevTweets';
import Masonry from './Masonry';
import './style.css';

const TweetsMasonry = () => {
  const devTweetsIds = useFetchDevTweets(useSelector, useDispatch);
  return <Masonry devTweetsIds={devTweetsIds} />;
};

export default TweetsMasonry;
