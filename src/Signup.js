import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <div className="main-container">
        <WelcomeMessage />
        <SignupForm />
    </div>
  );
};

export default Signup;