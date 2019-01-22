const Twit = require('twit');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
} = require('../secrets.js');
// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'tweets';

const twitter = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret,
});

// Use connect method to connect to the server
MongoClient.connect(
  url,
  function(err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('ny');
    const hashtags = db.collection('hashtags');
    let counter = 0;
    // Stream sample:
    const stream = twitter.stream('statuses/filter', {
      locations: '-74,40,-73,41',
    });
    stream.on('tweet', function(tweet) {
      tweet.created_at = new Date(tweet.created_at);
      if (tweet.entities.hashtags.length > 0) {
        for (let hashtag of tweet.entities.hashtags) {
          console.log('this one has a hashtag' + hashtag.text);
          hashtags.updateOne(
            { _id: hashtag.text.toLowerCase() },
            {
              $push: {
                points: {
                  'tweet.created_at': tweet.created_at,
                  geo: tweet.geo,
                },
              },
            },
            { upsert: true }
          );
        }
      }
      // After hashtag has been collected, put it in the database:
      collection.insertOne(tweet, function(err, result) {
        assert.equal(err, null);
        console.log('Inserted document into the collection', counter++);
      });
    });
  }
);

// Example of tweet object:
// const dataObj = {
//   _id: ObjectId('5c40e85422752c3131a0355f'),
//   created_at: 'Thu Jan 17 20:40:47 +0000 2019',
//   id: 1086000402141593600,
//   id_str: '1086000402141593600',
//   text:
//     '“Border Security Movement. “ Sounds Deza to me! How many bots pushing that shiz.',
//   source:
//     '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
//   truncated: false,
//   in_reply_to_status_id: null,
//   in_reply_to_status_id_str: null,
//   in_reply_to_user_id: null,
//   in_reply_to_user_id_str: null,
//   in_reply_to_screen_name: null,
//   user: {
//     id: 591494841,
//     id_str: '591494841',
//     name: 'Sue',
//     screen_name: 'SeBromley',
//     location: 'Oakland, CA',
//     url: null,
//     description:
//       'Seeker of truth, fun, integrity,  accountability and great pastry!',
//     translator_type: 'none',
//     protected: false,
//     verified: false,
//     followers_count: 151,
//     friends_count: 327,
//     listed_count: 0,
//     favourites_count: 7598,
//     statuses_count: 7761,
//     created_at: 'Sun May 27 01:42:02 +0000 2012',
//     utc_offset: null,
//     time_zone: null,
//     geo_enabled: false,
//     lang: 'en',
//     contributors_enabled: false,
//     is_translator: false,
//     profile_background_color: 'C0DEED',
//     profile_background_image_url:
//       'http://abs.twimg.com/images/themes/theme1/bg.png',
//     profile_background_image_url_https:
//       'https://abs.twimg.com/images/themes/theme1/bg.png',
//     profile_background_tile: false,
//     profile_link_color: '1DA1F2',
//     profile_sidebar_border_color: 'C0DEED',
//     profile_sidebar_fill_color: 'DDEEF6',
//     profile_text_color: '333333',
//     profile_use_background_image: true,
//     profile_image_url:
//       'http://pbs.twimg.com/profile_images/856195110945513472/CnMeTJ4M_normal.jpg',
//     profile_image_url_https:
//       'https://pbs.twimg.com/profile_images/856195110945513472/CnMeTJ4M_normal.jpg',
//     profile_banner_url:
//       'https://pbs.twimg.com/profile_banners/591494841/1492967962',
//     default_profile: true,
//     default_profile_image: false,
//     following: null,
//     follow_request_sent: null,
//     notifications: null,
//   },
//   geo: null,
//   coordinates: null,
//   place: null,
//   contributors: null,
//   quoted_status_id: 1085996520313376800,
//   quoted_status_id_str: '1085996520313376770',
//   quoted_status: {
//     created_at: 'Thu Jan 17 20:25:21 +0000 2019',
//     id: 1085996520313376800,
//     id_str: '1085996520313376770',
//     text:
//       'Things Trump is trying to distract you from: his AG nominee refused to commit to make Mueller’s report public, Cohe… https://t.co/e0Uk4F26qy',
//     display_text_range: [0, 140],
//     source:
//       '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
//     truncated: true,
//     in_reply_to_status_id: null,
//     in_reply_to_status_id_str: null,
//     in_reply_to_user_id: null,
//     in_reply_to_user_id_str: null,
//     in_reply_to_screen_name: null,
//     user: {
//       id: 548384458,
//       id_str: '548384458',
//       name: 'Joyce Alene',
//       screen_name: 'JoyceWhiteVance',
//       location: 'Alabama',
//       url: 'https://www.law.ua.edu/directory/People/view/Joyce_Vance',
//       description:
//         "U of Alabama Law Professor|@MSNBC Contributor|Obama US Atty in B'ham|25 year federal prosecutor|Wife & Mom of 4|Knitting a lot while watching the future",
//       translator_type: 'none',
//       protected: false,
//       verified: true,
//       followers_count: 214567,
//       friends_count: 872,
//       listed_count: 1487,
//       favourites_count: 34464,
//       statuses_count: 15809,
//       created_at: 'Sun Apr 08 12:20:45 +0000 2012',
//       utc_offset: null,
//       time_zone: null,
//       geo_enabled: false,
//       lang: 'en',
//       contributors_enabled: false,
//       is_translator: false,
//       profile_background_color: 'C0DEED',
//       profile_background_image_url:
//         'http://abs.twimg.com/images/themes/theme1/bg.png',
//       profile_background_image_url_https:
//         'https://abs.twimg.com/images/themes/theme1/bg.png',
//       profile_background_tile: false,
//       profile_link_color: '1DA1F2',
//       profile_sidebar_border_color: 'C0DEED',
//       profile_sidebar_fill_color: 'DDEEF6',
//       profile_text_color: '333333',
//       profile_use_background_image: true,
//       profile_image_url:
//         'http://pbs.twimg.com/profile_images/952257848301498371/5s24RH-g_normal.jpg',
//       profile_image_url_https:
//         'https://pbs.twimg.com/profile_images/952257848301498371/5s24RH-g_normal.jpg',
//       profile_banner_url:
//         'https://pbs.twimg.com/profile_banners/548384458/1485185212',
//       default_profile: true,
//       default_profile_image: false,
//       following: null,
//       follow_request_sent: null,
//       notifications: null,
//     },
//     geo: null,
//     coordinates: null,
//     place: null,
//     contributors: null,
//     quoted_status_id: 1085978219872964600,
//     quoted_status_id_str: '1085978219872964608',
//     is_quote_status: true,
//     extended_tweet: {
//       full_text:
//         'Things Trump is trying to distract you from: his AG nominee refused to commit to make Mueller’s report public, Cohen paid a Liberty Baptist IT guy for manipulating polls with a bag of cash, 1000s more kids separated from families at border than reported, Rudy conceded collusion. https://t.co/Nm0DH9LDlm',
//       display_text_range: [0, 279],
//       entities: {
//         hashtags: [],
//         urls: [
//           {
//             url: 'https://t.co/Nm0DH9LDlm',
//             expanded_url:
//               'https://twitter.com/presssec/status/1085978219872964608',
//             display_url: 'twitter.com/presssec/statu…',
//             indices: [280, 303],
//           },
//         ],
//         user_mentions: [],
//         symbols: [],
//       },
//     },
//     quote_count: 34,
//     reply_count: 65,
//     retweet_count: 550,
//     favorite_count: 1090,
//     entities: {
//       hashtags: [],
//       urls: [
//         {
//           url: 'https://t.co/e0Uk4F26qy',
//           expanded_url: 'https://twitter.com/i/web/status/1085996520313376770',
//           display_url: 'twitter.com/i/web/status/1…',
//           indices: [117, 140],
//         },
//       ],
//       user_mentions: [],
//       symbols: [],
//     },
//     favorited: false,
//     retweeted: false,
//     possibly_sensitive: false,
//     filter_level: 'low',
//     lang: 'en',
//   },
//   quoted_status_permalink: {
//     url: 'https://t.co/GwKoBC1rXb',
//     expanded: 'https://twitter.com/joycewhitevance/status/1085996520313376770',
//     display: 'twitter.com/joycewhitevanc…',
//   },
//   is_quote_status: true,
//   quote_count: 0,
//   reply_count: 0,
//   retweet_count: 0,
//   favorite_count: 0,
//   entities: { hashtags: [], urls: [], user_mentions: [], symbols: [] },
//   favorited: false,
//   retweeted: false,
//   filter_level: 'low',
//   lang: 'en',
//   timestamp_ms: '1547757647439',
// };

// const emptyObj = {
//   timestamp_ms: 'STRING',
//   created_at: 'Thu Jan 17 20:40:47 +0000 2019',
// };

// db.sample.find({
//   timestamp_ms: {
//     $gte: Math.round(new Date('2019-01-16').getTime() / 1000),
//     $lt: Math.round(new Date('2019-01-18').getTime() / 1000),
//   },
// });
