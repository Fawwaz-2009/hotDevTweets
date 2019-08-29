/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import github from '../../github.svg';
import './style.css';

const Header = () => {
  return (
    <header>
      <h1 className='title'>🔥🔥 Dev Tweets</h1>
      <a href='http://' target='_blank' className='github' rel='noopener noreferrer'>
        <img src={github} alt='fork me at github' />
      </a>
    </header>
  );
};

export default Header;
