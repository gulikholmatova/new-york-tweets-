import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import TweetText from './TweetText.js';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2tob2xtYXRvdmEiLCJhIjoiY2pyNXF5czFiMXltMjQzb3hycXdpNDFnYiJ9.WOkUYBR9u_f-siNxm--aeA';

export default class MapBox extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/gkholmatova/cjr5qz64g20mf2srx97se20xn',
      center: [-73.97, 40.76],
      zoom: 12,
      transition: {
        duration: 500,
        delay: 0,
      },
    });

    var hoverId = null;

    map.on('load', () => {
      let displayedTweetIds = [];
      this.interval = setInterval(async () => {
        const data = await axios.get(
          'https://68.183.49.146:4000/api/tweets-ny/one-tweet/'
        );

        let newTweets = data.data.features.filter(tweet => {
          const isnewTweet = !displayedTweetIds.includes(tweet.properties.id);
          if (isnewTweet) {
            displayedTweetIds.push(tweet.properties.id);
          }
          return isnewTweet;
        });
        map.getSource('icon').setData(data.data);
        if (displayedTweetIds) {
          map
            .getSource('newtweets')
            .setData({ type: 'FeatureCollection', features: newTweets });
          map.setPaintProperty('circ', 'circle-stroke-opacity', 1);
          map.setPaintProperty('circ', 'circle-radius', 5);
          setTimeout(() => {
            map.setPaintProperty('circ', 'circle-stroke-opacity', 0);
            map.setPaintProperty('circ', 'circle-radius', 50);
          }, 500);
        }
      }, 1000);

      map.addSource('icon', {
        type: 'geojson',
        data: 'https://68.183.49.146:4000/api/tweets-ny/one-tweet/',
        generateId: true,
      });

      map.addSource('newtweets', {
        type: 'geojson',
        data: 'https://68.183.49.146:4000/api/tweets-ny/one-tweet/',
        generateId: true,
      });

      map.addLayer({
        id: 'icon',
        type: 'symbol',
        source: 'icon',
        layout: {
          'text-line-height': 2, // this is to avoid any padding around the "icon"
          'text-padding': 0,
          'text-offset': [0, 0.2],
          'text-anchor': 'center', // change if needed, "bottom" is good for marker style icons like in my screenshot,
          'text-allow-overlap': true, // assuming you want this, you probably do
          'text-field': String.fromCharCode('0xf099'), // IMPORTANT SEE BELOW: -- this should be the unicode character you're trying to render as a string -- NOT the character code but the actual character,
          'icon-optional': true, // since we're not using an icon, only text.
          'text-font': ['Font Awesome 5 Brands Regular'], // see step 1 -- whatever the icon font name,
          'text-size': 18, // or whatever you want -- dont know if this can be data driven...
        },
        paint: {
          'text-translate-anchor': 'viewport', // up to you to change this -- see the docs
          'text-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#38A1F3',
            '#ffffff',
          ],
        },
      });

      map.addLayer({
        id: 'circ',
        type: 'circle',
        source: 'newtweets',
        paint: {
          'circle-radius': 50,
          'circle-opacity': 0,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#38A1F3',
          'circle-stroke-opacity': 0,
          'circle-stroke-opacity-transition': { duration: 500 },
          'circle-radius-transition': { duration: 1000 },
        },
      });
    });

    map.on('click', 'icon', function(e) {
      const url =
        'https://twitter.com/statuses//' + e.features[0].properties.id;
      var win = window.open(url, '_blank');
      win.focus();
    });

    map.on('mouseenter', 'icon', function(e) {
      let text = e.features[0].properties.text;
      let userName = e.features[0].properties.userName;

      console.log('feature.id', e.features[0].id);
      hoverId = e.features[0].id;
      ReactDOM.render(
        <TweetText text={text} userName={userName} />,
        document.getElementById('tweetText')
      );
      map.setFeatureState(
        { source: 'icon', id: e.features[0].id },
        { hover: true }
      );
    });

    map.on('mouseleave', 'icon', function(e) {
      console.log('event', e);
      ReactDOM.render(<span />, document.getElementById('tweetText'));
      map.setFeatureState({ source: 'icon', id: hoverId }, { hover: false });
    });
  }

  render() {
    return (
      <div id="map">
        <div
          ref={el => (this.mapContainer = el)}
          className="top right left bottom"
          style={{
            position: 'absolute',
            width: '96%',
            height: 'auto',
            margin: '2%',
          }}
        />
        <div id="tweetText" style={{ display: 'table' }} />
      </div>
    );
  }
}
