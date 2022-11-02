import React from 'react';
import 'assets/css/Messages.css';

function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}

export default MessageBox;
