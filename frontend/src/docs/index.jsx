import React from 'react';
import { render } from 'react-dom';
import Parallax from '../../lib';
import MapBox from './MapBox.js';
import BirdOne from './BirdOne.js';
import BirdTwo from './BirdTwo.js';
import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.css';
import './css/main.css';
import Bubble from './Bubble.js';

function Demo() {
  return (
    <div>
      <div className="grid">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-1 col-md-2">
              <div className="grid-line" />
            </div>
            <div className="col-md-2">
              <div className="grid-line" />
            </div>
            <div className="col-md-2">
              <div className="grid-line" />
            </div>
            <div className="col-md-2">
              <div className="grid-line" />
            </div>
            <div className="col-md-2">
              <div
                className="grid-line"
                style={{ marginRight: '-30px', borderRight: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>
      </div>

      <BirdOne className="fixed-top" speed={-2} />
      <main className="main">
        <header>
          <div className="container">
            <div className="row" />
            <div className="title">
              <div className="row">
                <div className="col-md-offset-1 col-md-7">
                  <h1>New York Tweets</h1>
                </div>
              </div>
            </div>
            <div className="subtitle">
              <div className="row">
                <div className="col-md-offset-1">
                  <h3>Let's see what the city is talking about.</h3>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="section san-francisco">
          <div className="absolute">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-1 col-md-11">
                  <Parallax as="h2" speed={-3}>
                    Tweet City, Tweet.
                    <br />
                    What's trending?
                  </Parallax>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute above">
            <div className="container">
              <div className="row">
                <Bubble />
                <div className="col-md-offset-1 col-md-2">
                  <BirdTwo className="lg-green" speed={2} />
                  <BirdOne className="sm-green" speed={5} />
                </div>
                <div className="col-md-offset-2 col-md-1">
                  <BirdOne className="sm-purple" speed={2} />
                </div>
                <div className="col-md-offset-3 col-md-1">
                  <BirdOne className="xs-green" speed={5} />
                  <BirdTwo className="md-green" speed={1} />
                </div>
                <div className="col-md-1">
                  <BirdTwo className="lg-purple" speed={3} />
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-offset-1 col-md-5">
                <div className="date" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" />

        <section className="section">
          <div style={{ marginTop: '200px' }}>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-12 text-center"
                  style={{ marginTop: '40px' }}
                >
                  <h4>New York Tweets Live </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-offset-2 col-md-8">
                  <div
                    className="text-editor"
                    style={{ padding: 0, height: '500px' }}
                  >
                    <MapBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="absolute above" style={{ pointerEvents: 'none' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-offset-1 col-md-2">
                  <BirdOne
                    className="bt-green"
                    speed={5}
                    style={{ transform: 'rotate(45deg)' }}
                  />
                </div>

                <div className="col-md-offset-0 col-md-1">
                  <BirdOne
                    className="md-dixonandmoe"
                    speed={2}
                    style={{ transform: 'rotate(45deg)' }}
                  />
                </div>

                <div className="col-md-offset-5 col-md-1">
                  <BirdOne
                    className="md-twitter"
                    speed={1}
                    style={{ transform: 'rotate(45deg)' }}
                  />
                </div>

                <div className="col-md-1">
                  <BirdOne
                    className="md-facebook"
                    speed={3}
                    percentage={0.5}
                    style={{ transform: 'rotate(45deg)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="copy"
            style={{ marginTop: '200px', marginBottom: '500px' }}
          />
        </section>

        <section className="share">
          <div className="container">
            <div className="row">
              <div className="col-md-offset-1 col-md-3">
                <a className="dam" href="https://github.com/gulikholmatova">
                  Guli Kholmatova
                </a>
              </div>
            </div>
          </div>

          <div className="title">
            <div className="row">
              <div className="col-md-3 text-right">
                <a href="https://github.com/gulikholmatova/new-york-tweets-">
                  @github
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
