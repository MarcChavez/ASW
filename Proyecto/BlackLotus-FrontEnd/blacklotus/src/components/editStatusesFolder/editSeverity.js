import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../../Token';
import { useParams } from 'react-router-dom';
import '../css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill


function EditSeverity() {
const [issue, setIssue] = useState(null)
let typeColor;
let labelColor;
let status = null;

const [selectedOption, setSelectedOption] = useState('');

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/';

function setTypeStatus()
{
    if (issue && issue.data.severity === 1){
        typeColor = "#70728F"
        status = "Whishlist"
    } else if (issue && issue.data.severity === 2){
        typeColor = "#40A8E4"
        status = "Minor"
    }else if (issue && issue.data.severity === 3){
        typeColor = "#40E47C"
        status = "Normal"
    }else if (issue && issue.data.severity === 4){
        typeColor = "#E4A240"
        status = "Important"
    }else if (issue && issue.data.severity === 5){
        typeColor = "#D35450"
        status = "Critical"
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
        severity: event.target.value,
      };
      
    changeStatus(data);
    setTypeStatus();
};

return (
    <div className='severityOption'>
        <label className='labelTypes'>
            severity
        </label>
        <div className='container-label-color'>
            <select className='select-type' id="dropdown"  value={status} onChange={handleSelectChange}>
                <option value="Whishlist">Whishlist</option>
                <option value="Minor">Minor</option>
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Critical">Critical</option>
            </select>
            <div className="circle-type" style={{ backgroundColor: typeColor}} ></div>
        </div>
    </div>
);
}

export default EditSeverity;
