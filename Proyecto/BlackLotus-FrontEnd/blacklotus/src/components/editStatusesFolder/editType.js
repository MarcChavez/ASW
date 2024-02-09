import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../../Token';
import { useParams } from 'react-router-dom';
import '../css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill


function EditType() {
const [issue, setIssue] = useState(null)
let typeColor;
let labelColor;
let status = null;

const [selectedOption, setSelectedOption] = useState('');

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/';

function setTypeStatus()
{
    issue && console.log(issue.data.type)
    if (issue && issue.data.type === 1){
        typeColor = "#E44057"
        status = "Bug"
    } else if (issue && issue.data.type === 2){
        typeColor = "#5178D3"
        status = "Question"
    }
    else if (issue && issue.data.type === 3){
        typeColor = "#40E4CE"
        status = "Disabled"
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
        type: event.target.value,
      };
      
    changeStatus(data);
    setTypeStatus();
};

return (
    <div className='typeOption'>
        <label className='labelTypes'>
            type
        </label>
        <div className='container-label-color'>
            <select className='select-type' id="dropdown"  value={status} onChange={handleSelectChange}>
                <option value="Bug">Bug</option>
                <option value="Question">Question</option>
                <option value="Disabled">Disabled</option>
            </select>
            <div className="circle-type" style={{ backgroundColor: typeColor}} ></div>
        </div>
    </div>
);
}

export default EditType;
