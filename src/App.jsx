/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import TweetsMasonry from './components/TweetsMasonry';
import './App.css';

import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='App-main'>
        <TweetsMasonry />
        <button className='btn' type='button'>
          See more 👀
        </button>
      </main>
    </div>
  );
}

export default App;
