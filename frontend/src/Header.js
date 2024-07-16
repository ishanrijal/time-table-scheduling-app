import React from 'react';
import userPhoto from './assets/icon/user.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">Time Scheduling App</div>
      <div className="user-profile">
        <img
          src={userPhoto}
          alt="User"
          onClick={() => window.location.href='/user-profile'}
        />
      </div>
    </div>
  );
};

export default Header;
