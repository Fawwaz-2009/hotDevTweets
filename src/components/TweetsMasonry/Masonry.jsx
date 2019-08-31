import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const Masonry = ({ devTweetsIds }) => {
  return (
    <div className='masonryContainer'>
      {devTweetsIds.map(tweetId => (
        <div className='tweetContainer' key={tweetId}>
          <Tweet tweetId={tweetId} />
        </div>
      ))}
    </div>
  );
};

export default Masonry;
