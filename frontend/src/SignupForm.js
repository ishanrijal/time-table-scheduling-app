// SignupForm.js
import React, { useState } from 'react';
import googleIcon from './assets/icon/google.png';
import facebookIcon from './assets/icon/facebook.png';
import appleIcon from './assets/icon/apple.png';
import microsoftIcon from './assets/icon/microsoft.png';
import lineIcon from './assets/icon/line.png';
import eyeIcon from './assets/icon/eye.png';

const SignupForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="home-right" style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
            <div className='signup-container'>
                <div className="signup-header">
                    <p>Step 1 of 2</p>
                    <h2>Create an account</h2>
                </div>
                <div className="social-buttons">
                    <img src={googleIcon} alt="Google" />
                    <img src={facebookIcon} alt="Facebook" />
                    <img src={appleIcon} alt="Apple" />
                    <img src={microsoftIcon} alt="Microsoft" />
                    <img src={lineIcon} alt="Line" />
                </div>
                <div className="or-separator">Or</div>
                <div className="signup-link">
                    <p className='bold-text'>Sign up with email </p>
                    <p>Already have an account? <a href="/login">Sign in</a></p>
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
                            <img 
                                src={eyeIcon} 
                                alt="Toggle visibility" 
                                onClick={togglePasswordVisibility} 
                            />
                        </div>
                    </div>
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
