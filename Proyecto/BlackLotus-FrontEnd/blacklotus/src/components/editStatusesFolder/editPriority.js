import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../../Token';
import { useParams } from 'react-router-dom';
import '../css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill


function EditPriority() {
const [issue, setIssue] = useState(null)
let typeColor;
let labelColor;
let status = null;

const [selectedOption, setSelectedOption] = useState('');

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/';

function setTypeStatus()
{
    if (issue && issue.data.priority === 1){
        typeColor = "#A8E440"
        status = "Low"
    } else if (issue && issue.data.priority === 2){
        typeColor = "#E4CE40"
        status = "Normal"
    }
    else if (issue && issue.data.priority === 3){
        typeColor = "#E47C40"
        status = "High"
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
        setTypeStatus();
        
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

setTypeStatus();

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
      } 
  };

const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    const data = {
        priority: event.target.value,
      };
      
    changeStatus(data);
    setTypeStatus();
};

return (
    <div className='severityOption'>
        <label className='labelTypes'>
            priority
        </label>
        <div className='container-label-color'>
            <select className='select-type' id="dropdown"  value={status} onChange={handleSelectChange}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
            </select>
            <div className="circle-type" style={{ backgroundColor: typeColor}} ></div>
        </div>
    </div>
);
}

export default EditPriority;
