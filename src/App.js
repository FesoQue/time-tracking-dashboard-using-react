import { React, useState, useEffect } from 'react';
import { Card } from './Card';
import { Footer } from './Footer';
import Header from './Header';
import preloader from './images/preloader.svg';

const App = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [timeframe, setTimeframe] = useState('Daily');
  const [period, setPeriod] = useState(timeframe);
  const [records, setRecords] = useState('yesterday');
  const [error, setError] = useState(false);
  const [isActive, setisActive] = useState(false);

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
        setPeriod('Daily');
        setRecords('Yesterday');
        break;
      case 'Weekly':
        setTimeframe('Weekly');
        setisActive(true);
        setPeriod('Weekly');
        setRecords('Last Week');
        break;
      case 'Monthly':
        setTimeframe('Monthly');
        setisActive(true);
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
                    disabled={timeframe === 'Daily' && isActive}
                  >
                    Daily
                  </button>
                  <button
                    id='btn'
                    className={timeframe === 'Weekly' ? 'active' : 'btn'}
                    data-id='Weekly'
                    onClick={() => handleClick('Weekly')}
                    disabled={timeframe === 'Weekly' && isActive}
                  >
                    Weekly
                  </button>
                  <button
                    id='btn'
                    className={timeframe === 'Monthly' ? 'active' : 'btn'}
                    data-id='Monthly'
                    onClick={() => handleClick('Monthly')}
                    disabled={timeframe === 'Monthly' && isActive}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
            {/* activity cards */}
            <div className='activities container'>
              {userActivity.map((activity, index) => {
                return (
                  <Card
                    key={index}
                    activity={activity}
                    period={period}
                    records={records}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
      {/* Attribution */}
      <Footer />
    </>
  );
};

export default App;
