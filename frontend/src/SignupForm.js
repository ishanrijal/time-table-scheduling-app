import React, { useState, useEffect } from 'react';
import axios from 'axios';
import googleIcon from './assets/icon/google.png';
import facebookIcon from './assets/icon/facebook.png';
import appleIcon from './assets/icon/apple.png';
import microsoftIcon from './assets/icon/microsoft.png';
import lineIcon from './assets/icon/line.png';
import eyeIcon from './assets/icon/eye.png';

const SignupForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [batch, setBatch] = useState(''); // Default to empty initially
    const [faculty, setFaculty] = useState(''); // Default to empty initially
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [batches, setBatches] = useState([]);
    const [faculties, setFaculties] = useState([]);

    // Fetch batches and faculties data
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/batches/');
                setBatches(response.data); // Assuming the data is in the correct format
            } catch (error) {
                console.error('Error fetching batches:', error);
            }
        };

        const fetchFaculties = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/faculties/');
                setFaculties(response.data); // Assuming the data is in the correct format
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };

        fetchBatches();
        fetchFaculties();
    }, []); // Empty dependency array means this runs once when the component mounts

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordsMatch(password === newConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordsMatch) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            password: password,
            batch: batch,
            faculty: faculty
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', userData);
            console.log('User created successfully:', response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="home-right" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className='signup-container'>
                <div className="signup-header">
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
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className='form-filed-container'>
                        <label htmlFor="fname">First Name</label>
                        <input 
                            type="text" 
                            name='fname' 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='form-filed-container'>
                        <label htmlFor="lname">Last Name</label>
                        <input 
                            type="text" 
                            name='lname' 
                            placeholder="Last Name" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                        />
                    </div>
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
                    <div className='form-field-container'>
                        <label htmlFor="role">Role</label>
                        <br/>
                        <select 
                            name='role' 
                            id='role' 
                            value={role}
                            onChange={(e) => setRole(e.target.value)} 
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="instructor">Instructor</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className='form-field-container'>
                        <label htmlFor="batch">Batch</label>
                        <br/>
                        <select 
                            name='batch' 
                            id='batch' 
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)} 
                            required
                        >
                            <option value="" disabled>Select Batch</option>
                            {batches.map((batch) => (
                                <option key={batch.id} value={batch.id}>{batch.year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-field-container'>
                        <label htmlFor="faculty">Faculty</label>
                        <br/>
                        <select 
                            name='faculty' 
                            id='faculty' 
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)} 
                            required
                        >
                            <option value="" disabled>Select Faculty</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                            ))}
                        </select>
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
                            <img 
                                src={eyeIcon} 
                                alt="Toggle visibility" 
                                onClick={togglePasswordVisibility} 
                            />
                        </div>
                    </div>
                    <div className='form-filed-container'>
                        <label htmlFor="confirm-password" className="password-input">Confirm Password</label>
                        <div className='password-filed-wrapper'>
                            <input 
                                type={confirmPasswordVisible ? "text" : "password"} 
                                name="confirm-password"
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange} 
                                required 
                            />
                            <img 
                                src={confirmPasswordVisible ? eyeIcon : eyeIcon} 
                                alt="Toggle visibility" 
                                onClick={toggleConfirmPasswordVisibility} 
                            />
                        </div>
                        <p style={{marginBottom:'24px'}}>
                            {confirmPassword && (
                                confirmPassword !== password 
                                ? <span className="status-text" style={{color:'red', margin: '16px 0'}}>Passwords Don't Match</span>
                                : ''
                            )}
                        </p>
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;