require('dotenv').config({ path: './.env.development.local' });
const Twit = require('twit');

exports.handler = async (event, context) => {
  let { start_from = 0 } = event.queryStringParameters;
  start_from = parseInt(start_from);

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
    'css',
    'stolinski',
    'freeCodeCamp',
    'ossia',
    'andrew_j_mead',
    'why_is_js_mad',
    'ryanflorence',
    '_jayphelps',
    'eastdakota',
    'Paul_Kinlan',
    'Chr_Bach',
    'ka11away',
    'prisma',
    'jlengstorf',
    'piamancini',
    'palashv2',
    'feross',
    'jdan',
    'DavidKPiano',
    'FrontendDaily',
    'derickbailey',
    'troyhunt',
    'GraphQL',
    'leeb',
    'CompuIves',
    'aweary',
    'Netlify',
    'philhawksworth',
    'gatsbyjs',
    'EmmaWedekind',
    'TaelurAlexis',
    'kathyra_',
    'erinfranmc',
    'Syknapse',
    'facebookai',
    'fchollet',
    'iamtrask',
    'hardmaru',
    'zacharylipton',
    'auchenberg',
    'iam_preethi',
    'TheLarkInn',
    'BenLesh',
    'kyleshevlin',
    'jhooks',
    'ZackArgyle',
    'blowdart',
    'hugs',
    'WithinRafael',
    'mschoening',
    'swyx',
    'silveira_bells',
    'midudev',
    'AmarachiAmaechi',
    'AnjanaVakil',
    'buritica',
    'migueldeicaza'
  ];

  //intiating our Twit library with our secrets and tokens
  const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
    strictSSL: true
  });
  const getMostFavoriteTweetId = async screenName => {
    let latestTweets = await T.get('statuses/user_timeline', {
      screen_name: screenName,
      exclude_replies: true,
      include_rts: false
    });

    // tweets in the last 24hrs
    const tweetsOfTheDay = latestTweets.data.filter(({ created_at }) => {
      const tweetAge = new Date().getTime() - Date.parse(created_at);
      return tweetAge < 24 * 60 * 60 * 1000;
    });

    // find and return most favorited tweet in the last 24hrs OR return null if hasn't tweeted in the last 24hrs
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

  // only sending the latest 10
  let goingToPlay = [];
  let isNoMoreDev = false;
  let newCursor = start_from;
  // gone through all devs
  if (start_from > theAllStartsLineup.length - 1) {
    goingToPlay = [];
    isNoMoreDev = true;
    // sending the tweet ids of the last devs
  } else if (start_from + 10 > theAllStartsLineup.length - 1) {
    goingToPlay = theAllStartsLineup.slice(start_from);
    isNoMoreDev = true;
    newCursor = start_from + theAllStartsLineup.length - 1 - start_from;
    // sending the tweets ids of 10 more devs
  } else {
    goingToPlay = theAllStartsLineup.slice(start_from, start_from + 11);
    newCursor = start_from + 11;
  }
  //   fetching tweets of devs in the list and returning the  mostFavoriteTweetIds in parallel
  let mostFavoriteTweetIds = await Promise.all(
    goingToPlay.map(async screenName => {
      try {
        const id = await getMostFavoriteTweetId(screenName);
        return id;
      } catch (error) {
        return { error, screenName };
      }
    })
  );
  // filtering devs who they didn't tweet in the last 24hrs
  mostFavoriteTweetIds = mostFavoriteTweetIds.filter(tweetId => tweetId !== null);
  // filtering errors
  mostFavoriteTweetIds = mostFavoriteTweetIds.filter(tweet => !tweet.error);
  return {
    statusCode: 200,
    body: JSON.stringify({
      mostFavoriteTweetIds,
      newCursor,
      isNoMoreDev
    })
  };
};
