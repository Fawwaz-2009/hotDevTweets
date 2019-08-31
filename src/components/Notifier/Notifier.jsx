import React from 'react';
import { useSelector } from 'react-redux';

import './style.css';
import { DEV_TWEETS } from '../../constants';

const getMsgAndStyle = (isLoading, error) => {
  const notifications = {
    success: { msg: 'New tweets loaded', classStyle: 'success' },
    fail: { msg: 'Something went wrong', classStyle: 'error' },
    loading: { msg: 'Loading', classStyle: '' }
  };
  if (!isLoading && !error) {
    return notifications.success;
  } else if (error) {
    return notifications.fail;
  } else {
    return notifications.loading;
  }
};

const Notifier = () => {
  const { isLoading, error, isNotifying } = useSelector(({ isLoading, error, isNotifying }) => ({
    isLoading,
    error,
    isNotifying
  }));
  const { msg, classStyle } = getMsgAndStyle(isLoading, error);
  const enter = isNotifying ? 'enter' : '';
  return (
    <div className={`notifier ${enter} ${classStyle}`}>
      <p className='message'>{msg}</p>
    </div>
  );
};

export default Notifier;
