import { React, useState, useEffect } from 'react';
import Header from './Header';
import ellipsis from './images/icon-ellipsis.svg';
import Work from './images/icon-work.svg';
import Play from './images/icon-play.svg';
import Study from './images/icon-study.svg';
import Exercise from './images/icon-exercise.svg';
import Social from './images/icon-social.svg';
import SelfCare from './images/icon-self-care.svg';
import preloader from './images/preloader.svg';

const App = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [timeframe, setTimeframe] = useState('Daily');
  const [period, setPeriod] = useState(timeframe);
  const [records, setRecords] = useState('yesterday');
  const [error, setError] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [disabled, setDiasbled] = useState(false);

  const fetchUserActivity = async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      setUserActivity(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchUserActivity();
    }, 1500);
  }, []);

  const reload = () => {
    fetchUserActivity();
  };

  const handleClick = (arg) => {
    switch (arg) {
      case 'Daily':
        setTimeframe('Daily');
        setisActive(true);
        setDiasbled(true);
        setPeriod('Daily');
        setRecords('Yesterday');
        break;
      case 'Weekly':
        setTimeframe('Weekly');
        setisActive(true);
        setDiasbled(true);
        setPeriod('Weekly');
        setRecords('Last Week');
        break;
      case 'Monthly':
        setTimeframe('Monthly');
        setisActive(true);
        setDiasbled(true);
        setPeriod('Monthly');
        setRecords('Last Month');
        break;

      default:
        break;
    }
  };

  return (
    <>
      <main>
        {error && (
          <div className='error'>
            <h1>there is an error</h1>
            <button className='reload-btn' onClick={reload}>
              Reload
            </button>
          </div>
        )}
        {userActivity.length === 0 ? (
          <div className='preloader'>
            <img src={preloader} alt='loader' width='80px' height='80px' />
          </div>
        ) : (
          <div className='dashboard container'>
            <div className='profile'>
              <div className='profile-card'>
                <div className='header'>
                  <Header data={userActivity} />
                </div>
              </div>
              {/* periodic buttons */}
              <div className='btn-container'>
                <div className='btns'>
                  <button
                    id='btn'
                    className={timeframe === 'Daily' ? 'active' : 'btn'}
                    data-id='Daily'
                    onClick={() => handleClick('Daily')}
                    disabled={timeframe === 'Daily' ? disabled : false}
                  >
                    Daily
                  </button>
                  <button
                    id='btn'
                    className={timeframe === 'Weekly' ? 'active' : 'btn'}
                    data-id='Weekly'
                    onClick={() => handleClick('Weekly')}
                    disabled={timeframe === 'Weekly' ? disabled : false}
                  >
                    Weekly
                  </button>
                  <button
                    id='btn'
                    className={timeframe === 'Monthly' ? 'active' : 'btn'}
                    data-id='Monthly'
                    onClick={() => handleClick('Monthly')}
                    disabled={timeframe === 'Monthly' ? disabled : false}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
            <div className='activities container'>
              {userActivity.map((activity, index) => {
                let { title, timeframes } = activity;
                const periodicity = period.toLowerCase();
                const currentStreak = timeframes[periodicity].current;
                const previousStreak = timeframes[periodicity].previous;
                title = title.split(' ').join('-');
                return (
                  <div className='activity-card' key={index} id={title}>
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
                );
              })}
            </div>
          </div>
        )}
      </main>
      <footer className='container'>
        <div class='attribution'>
          Challenge by
          <a
            href='https://www.frontendmentorio?ref=challenge'
            rel='noreferrer'
            target='_blank'
          >
            Frontend Mentor
          </a>
          . Coded by <a href='https://www.github.com/fesoque'>Feso Que</a>.
        </div>
      </footer>
    </>
  );
};

export default App;
