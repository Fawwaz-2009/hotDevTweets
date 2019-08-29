require('dotenv').config({ path: "./.env.development.local" })
const Twit = require('twit');


exports.handler = async (event, context) => {
    // Netlify functions allows only 10s to run, so if the work takes 9s will send a response to the user asking him to try again
    const startTime=new Date().getTime()
    const deadline=9*1000;
    setInterval(() => {
        if(new Date().getTime()-startTime>deadline){
            return{
                statusCode: 500,
                body: JSON.stringify({
                  error:"Lambda took more than 9s"
                })
              };
        }
    }, 100);


  const theAllStartsLineup = [
    'wesbos',
    '_ericelliott',
    'traversymedia',
    'caitie',
    'shahzaibkhalid',
    'hakimel',
    'tylermcginnis',
    'addyosmani',
    'rachelandrew',
    'SaraSoueidan',
    'brad_frost',
    'vlh',
    'sarah_edo',
    'zeithq',
    'adamwathan',
    'rauchg',
    'steveschoger',
    'kentcdodds',
    'sinequanonh',
    'mpjme',
    'dan_abramov',
    'mweststrate',
    'css'
  ];

//   intiating our Twit library with our secrets and tokem
  const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true // optional - requires SSL certificates to be valid.
  });
  const getMostFavoriteTweetId = async screenName => {
    const latestTweets = await T.get('statuses/user_timeline', {
      screen_name: screenName,
      exclude_replies: true,
      include_rts: false
    });
    const tweetsOfTheDay = latestTweets.data.filter(({ created_at }) => {
      const tweetAge = new Date().getTime() - Date.parse(created_at);
      return tweetAge < 24 * 60 * 60 * 1000;
    });

    // has tweeted in the last 24hrs
    if (tweetsOfTheDay.length > 0) {
      let mostFavoriteTweet = null;
      const favoriteCount = 0;

      tweetsOfTheDay.forEach(tweet => {
        if (tweet.favorite_count > favoriteCount) {
          mostFavoriteTweet = tweet;
        }
      });
      return mostFavoriteTweet.id_str;
    }
    return null;
  };

//   fetching tweets of devs in the list and returning the  mostFavoriteTweetIds in parallel
  const mostFavoriteTweetIds = await Promise.all(
    theAllStartsLineup.map(async screenName => {
      try {
        const id = await getMostFavoriteTweetId(screenName);
        return id;
      } catch (error) {
        return { error, screenName };
      }
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
      mostFavoriteTweetIds: mostFavoriteTweetIds.filter(tweetId => tweetId !== null)
    })
  };
};