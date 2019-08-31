const fetchDevTweets = async cursor => {
  const response = await fetch(`/.netlify/functions/getDevTweets?start_from=${cursor}`);
  const { mostFavoriteTweetIds, newCursor, isNoMoreDev } = await response.json();
  return { mostFavoriteTweetIds, newCursor, isNoMoreDev };
};

export default fetchDevTweets;
