import Parallax from '../../lib';
import React from 'react';
import axios from 'axios';

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      'https://68.183.49.146:4000/api/tweets-ny/hashtags/30'
    );
    this.setState({
      data: response,
      isLoading: false,
    });
  }

  render() {
    if (!this.state.isLoading) {
      const data = this.state.data.data;
      return data.features.map(function(doc, index) {
        const speed = Math.floor(10 * Math.random()) - 5;
        const size = Math.floor(Math.sqrt(doc.count) * 9).toString() + 'px';
        const textSize = Math.floor(5 + doc.count * 0.04).toString() + 'px';
        return (
          <div key={doc._id} className={`col-md-1 col-md-offset-1`}>
            <Parallax
              speed={speed}
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                borderRadius: '50%',
                fontSize: textSize,
                color: 'grey',
                lineHeight: size,
                textAlign: 'center',
                width: size,
                height: size,
              }}
            >
              #{doc._id}
            </Parallax>
          </div>
        );
      });
    } else return <div />;
  }
}
