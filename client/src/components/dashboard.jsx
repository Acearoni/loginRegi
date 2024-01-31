import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';



const Dashboard = (props) => {
    const navigate = useNavigate()
    const logout = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials: true})
            .then(navigate('/'))
            .catch((err) => {
                console.log(err);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
            
    }



    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
