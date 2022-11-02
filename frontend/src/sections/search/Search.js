import React, { useState } from 'react';
import 'assets/css/Nav.css';

export default function Search(props) {
  const [title, setTitle] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/title/${title}`);
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search here.."
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
