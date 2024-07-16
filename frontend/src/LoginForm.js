import React, { useState } from 'react';
import googleIcon from './assets/icon/google.png';
import facebookIcon from './assets/icon/facebook.png';
import appleIcon from './assets/icon/apple.png';
import microsoftIcon from './assets/icon/microsoft.png';
import lineIcon from './assets/icon/line.png';
import eyeOpen from './assets/icon/eye.png';
import eyeClose from './assets/icon/eye-close.png';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };

  return (
      <div className="home-right" style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
          <div className='signup-container'>
              <div className="signup-header">
                  <h2>Login</h2>
              </div>
              <form className="signup-form">
                  <div className='form-filed-container'>
                      <label for="email">Email address</label>
                      <input type="email" name='email' placeholder="Email address" required />
                  </div>
                  <div className='form-filed-container'>
                      <label for="paassword" className="password-input">Password </label>
                      <div className='password-filed-wrapper'>
                          <input 
                              type={passwordVisible ? "text" : "password"} 
                              name="password"
                              placeholder="Password" 
                              required 
                          />
                          {
                            passwordVisible
                            ?( <img 
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