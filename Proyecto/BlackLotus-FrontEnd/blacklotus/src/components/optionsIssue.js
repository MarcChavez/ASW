import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../Token';
import './css/issue.css'
import { useParams, useNavigate } from 'react-router-dom';
import Block from './blockIssue';


function OptionsIssue() {

const navigate = useNavigate()
const { id } = useParams();
const handleButtonClick = async () => {

        fetch("http://127.0.0.1:8000/issue/"+id+"/", {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
            }
        })
        .catch(error => console.error(error));
       
        navigate('/');
};

return (
    <div className="button-options">
        <button className="deadline">Botón 1</button>
        <Block/>
        <button onClick={handleButtonClick} className="deleteIssue"></button>
    </div>
);
}

export default OptionsIssue;
