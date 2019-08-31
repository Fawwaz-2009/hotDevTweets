/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import TweetsMasonry from './components/TweetsMasonry';
import Notifier from './components/Notifier';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <main className='App-main'>
          <Notifier />
          <TweetsMasonry />
          <Footer />
        </main>
      </div>
    </Provider>
  );
}

export default App;
