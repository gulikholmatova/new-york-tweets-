import React from 'react';

const TweetText = props => {
  return (
    <div
      className="inline-block top right bg-darken75 color-white z1 round-full"
      style={{
        position: 'absolute',
        width: '60%',
        height: '11%',
        margin: '3%',
        padding: '2%',
        fontSize: '8pt',
        display: 'table-cell',
        verticalAlign: 'middle',
      }}
    >
      <span style={{ color: 'blue' }}>{props.userName}: </span>
      <span>{props.text}</span>
    </div>
  );
};

export default TweetText;
