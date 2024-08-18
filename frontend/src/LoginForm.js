import React, { useState } from 'react';
import axios from 'axios';
import googleIcon from './assets/icon/google.png';
import facebookIcon from './assets/icon/facebook.png';
import appleIcon from './assets/icon/apple.png';
import microsoftIcon from './assets/icon/microsoft.png';
import lineIcon from './assets/icon/line.png';
import eyeOpen from './assets/icon/eye.png';
import eyeClose from './assets/icon/eye-close.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        alert('Logged In Successfully');
        const { token, 'user-info': userInfo } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user-info', JSON.stringify(userInfo));

        navigate('/dashboard/information'); // Redirect to the dashboard on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="home-right" style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
      <div className='signup-container'>
        <div className="signup-header">
          <h2>Login</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className='form-filed-container'>
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              name='email' 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className='form-filed-container'>
            <label htmlFor="password" className="password-input">Password</label>
            <div className='password-filed-wrapper'>
              <input 
                type={passwordVisible ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              {
                passwordVisible
                ? ( <img 
                    src={eyeOpen} 
                    alt="Toggle visibility" 
                    onClick={togglePasswordVisibility} 
                  />)
                : ( <img 
                    src={eyeClose} 
                    alt="Toggle visibility" 
                    onClick={togglePasswordVisibility} 
                  />)
              }
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Create Now</a></p>
        </div>
        <div className="or-separator">Or</div>
        <div className="social-buttons">
          <img src={googleIcon} alt="Google" />
          <img src={facebookIcon} alt="Facebook" />
          <img src={appleIcon} alt="Apple" />
          <img src={microsoftIcon} alt="Microsoft" />
          <img src={lineIcon} alt="Line" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;