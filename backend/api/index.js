const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const assert = require('assert');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, './public')));

// MongoClient
MongoClient.connect(
  url,
  (err, client) => {
    assert.equal(null, err);
    db = client.db('tweets');
    console.log('connected to the db!');
  }
);

app.get('/api/tweets-ny/hashtags/:n', async (req, res, next) => {
  try {
    const cursor = db
      .collection('hashtags')
      .aggregate([
        { $project: { count: { $size: { $ifNull: ['$points', []] } } } },
        { $sort: { count: -1 } },
        { $limit: parseInt(req.params.n) },
      ]);
    const data = await cursor.toArray();
    res.status(200).send({
      type: 'Most Popular Hashtags',
      features: data,
    });
    // .send({ data: data });
  } catch (err) {
    next(err);
  }
});

app.get('/api/tweets-ny/one-tweet', async (req, res, next) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5);
  try {
    const cursor = db.collection('ny').find({ created_at: { $gte: now } });
    console.log('now', now);
    const data = await cursor.toArray();
    // console.log('await result', data);
    res.status(200).send({
      type: 'FeatureCollection',
      features: data
        .filter(doc => doc.geo)
        .map(doc => {
          doc.geo.coordinates = doc.geo.coordinates.reverse();
          return {
            geometry: doc.geo,
            type: 'Feature',
            properties: {
              text: doc.text,
              id: doc.id_str,
              userName: doc.user.name,
            },
          };
        }),
    });
  } catch (err) {
    next(err);
  }
});

// Sending the index.html for any requests that don't match one of our API routes
app.get('/api', (req, res, next) => {
  try {
    res.send('Hello world');
  } catch (err) {
    next(err);
  }
});

// All other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handling 500 server errors and logging them out:
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
