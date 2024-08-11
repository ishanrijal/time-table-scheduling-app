import React from 'react';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import WelcomeMessage from './WelcomeMessage';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="main-container">
        <WelcomeMessage />
        <LoginForm />
    </div>
  );
};

export default Login;