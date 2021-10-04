import React from 'react';
import Avatar from './images/image-jeremy.png';
const Header = () => {
  return (
    <>
      <div className='img-wrap'>
        <img src={Avatar} alt='Jeremy' width='80px' height='80px' />
      </div>
      <div className='details'>
        <p>report for</p>
        <p>
          Jeremy <br /> Robson
        </p>
      </div>
    </>
  );
};

export default Header;
