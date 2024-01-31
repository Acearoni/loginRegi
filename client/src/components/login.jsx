import React, { useState, useTransition } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const loginUser = {email, password}
        axios.post('http://localhost:8000/api/loginUser', loginUser, {withCredentials:true})
            .then((res) => {
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.message)
            })
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                {
                    errors.length > 0?
                    <p>{errors}</p>:
                    null
                }
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
                <Link to={'/'}>Sign Up</Link>
            </form>
        </div>
    );
}

export default Login;
