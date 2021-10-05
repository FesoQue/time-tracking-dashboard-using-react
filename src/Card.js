import React from 'react';
import ellipsis from './images/icon-ellipsis.svg';

export const Card = ({ activity, period, records }) => {
  let { title, timeframes } = activity;
  const periodicity = period.toLowerCase();
  const currentStreak = timeframes[periodicity].current;
  const previousStreak = timeframes[periodicity].previous;
  title = title.split(' ').join('-');
  return (
    <div>
      <div className='activity-card' id={title}>
        <div className='info'>
          <div className='desc-heading'>
            <h3>{title}</h3>
            <img src={ellipsis} alt='' />
          </div>
          <div className='desc-info'>
            <p>{currentStreak}hrs</p>
            <p>
              {records} - {previousStreak}hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
