import React from 'react';
import Loading from 'assets/svgs/sand-clock.svg';
import 'assets/css/Messages.css';

function LoadingBox() {
  return (
    <div className="loading-box">
      <img src={Loading} alt="" width="70" />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingBox;
