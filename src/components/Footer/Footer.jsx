/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import * as Actions from '../../actions';
import './style.css';

const Footer = () => {
  const { isLoading, isNoMoreDev } = useSelector(({ isLoading, isNoMoreDev }) => ({
    isLoading,
    isNoMoreDev
  }));
  const dispatch = useDispatch();
  return (
    <footer>
      {(() => {
        if (isNoMoreDev) {
          return <h2>There will be more 🔥🔥 dev tweets to come.</h2>;
        } else {
          return (
            <>
              {isLoading ? (
                <div className='loaderContainer'>
                  <div className='loader' />
                </div>
              ) : (
                <button
                  className='btn'
                  type='button'
                  onClick={() => dispatch(Actions.fetchDevTweets())}
                >
                  See more 👀
                </button>
              )}
            </>
          );
        }
      })()}
    </footer>
  );
};

export default Footer;
