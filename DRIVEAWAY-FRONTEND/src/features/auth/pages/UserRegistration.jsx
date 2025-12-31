import React, { useState } from 'react'
import { register } from '../services';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
    const [user, setUser] = useState({
        userName: '',
        userPhone : '',
        userAge : 0,
        userEmail : '',
        password : '',
        role : 'CUSTOMER',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    const handleUser = async (e) => {
        e.preventDefault();
        try {
            const response = await register(user);
            if(response.data) setMessage("Registration Success");
            setError("");
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    }

    return (
    <div>
        {
            error.length > 0 ? (
                <p style={{color:'red', fontWeight:'bold'}}>{error}</p>
            ):message.length > 0 ?
            (
                <p style={{color:'green', fontWeight:'bold'}}>{message}</p>
            ):null
        }
        <input 
            name='userName' 
            type='text' 
            value={user.userName}
            placeholder='Enter Name' 
            required
            onChange={handleChange}
        />
        <input 
            name='userEmail' 
            type='email'
            value={user.userEmail}
            placeholder='Enter Email' 
            required
            onChange={handleChange}
        />
        <input 
            name='userAge' 
            type='number'
            value={user.userAge} 
            placeholder='Enter age' 
            required
            onChange={handleChange}
        />
        <input 
            name='userPhone' 
            type='text' 
            value={user.userPhone}
            placeholder='Enter phone number' 
            required
            onChange={handleChange}
        />
        <input 
            name='password' 
            type='password'
            value={user.password} 
            placeholder='Enter password' 
            required
            onChange={handleChange}
        />
        <input 
            onClick={handleUser} 
            type='submit' 
        />
    </div>
  )
}

export default UserRegistration