import React, { useEffect, useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
import './style.css';

// just to make the layout more intreating
const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const TweetsMasonry = () => {
  const [tweetIds, setTweetIds] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('/.netlify/functions/getDevTweets');
      const data = await response.json();
      setTweetIds(shuffle(data.mostFavoriteTweetIds));
    })();
    return () => {};
  }, []);
  return (
    <div className='masonryContainer'>
      {tweetIds.map(tweetId => (
        <div className='tweetContainer'>
          <Tweet tweetId={tweetId} key={tweetId} />
        </div>
      ))}
    </div>
  );
};

export default TweetsMasonry;
