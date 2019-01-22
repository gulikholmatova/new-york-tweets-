import React from 'react';
import Parallax from 'react-rellax';

const BirdOne = props => {
  const url1 =
    'http://www.freeiconspng.com/uploads/outline-logo-twitter-transparent-png-25.png';
  return (
    <div>
      <div className={props.className}>
        <Parallax speed={props.speed}>
          <img src={url1} />
        </Parallax>
      </div>
    </div>
  );
};

export default BirdOne;
