import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../../Token';
import { useParams } from 'react-router-dom';
import '../css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill


function EditStatus() {
const [issue, setIssue] = useState(null)
let labelColor;
let labelText;
let status = null;

const [selectedOption, setSelectedOption] = useState('');

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/';

function setTextState(){
    if (issue && issue.data.status === 1){
        labelColor = '#70728F';
        labelText = 'OPEN';
        status = "New"
    } else if (issue && issue.data.status === 2){
        labelColor = '#40A8E4';
        labelText = 'OPEN';
        status = "In progress"
    }else if (issue && issue.data.status === 3){
        labelColor = '#E4CE40';
        labelText = 'OPEN';
        status = "Ready for test";
    }else if (issue && issue.data.status === 4){
        labelColor = '#A8E440';
        labelText = 'CLOSED';
        status = "Closed"
    }else if (issue && issue.data.status === 5){
        labelColor = '#E44057';
        labelText = 'OPEN';
        status = "Needs info"
    }else if (issue && issue.data.status === 6){
        labelColor = '#A9AABC';
        labelText = 'CLOSED';
        status = "Rejected"
    }else if (issue && issue.data.status === 7){
        labelColor = '#5178D3';
        labelText = 'OPEN';
        status = "Postponed"
    }
}


const fetchIssue = async () => {
    try {
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getToken()
        }
    });
    if (response.ok) {
        const data = await response.json();
        setIssue(data);
        
    } else {
        throw new Error('Failed to fetch profile');
    }      
}   catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    
    fetchIssue();
}, []);

setTextState()

const changeStatus = async (formData) => {
    const response = await fetch( URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
            },
        body: JSON.stringify(formData)
    });
    if (response.ok) {
        const data = await response.json();
        fetchIssue();
        setTextState();
      } 
  };

const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    const data = {
        status: event.target.value,
      };
      
    changeStatus(data);
};

return (

    <div className='status-header'>
        <label className='ticket-title'>
            {labelText}
        </label>
        <select className='select-status' style={{backgroundColor: labelColor }} id="dropdown" value={status} onChange={handleSelectChange}>
            <option value="New">NEW</option>
            <option value="In progress">IN PROGRESS</option>
            <option value="Ready for test">READY FOR TEST</option>
            <option value="Closed">CLOSED</option>
            <option value="Needs info">NEEDS INFO</option>
            <option value="Rejected">REJECTED</option>
            <option value="Postponed">POSTPONED</option>
        </select>
    </div>
);
}

export default EditStatus;
