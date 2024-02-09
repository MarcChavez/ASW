import React, { useState} from 'react';
import './creaIssue.css'
import { getToken, getCookie } from '../../Token';
import { useNavigate } from 'react-router-dom';


function CreaIssue() {

const navigate = useNavigate()

const URL = 'http://127.0.0.1:8000/issues/';
  

var [subject, setSubject] = useState('');
var [description, setDescription] = useState('');
var [status, setStatus] = useState('New');
var [type, setType] = useState('Bug');
var [priority, setPriority] = useState('Low');
var [severity, setSeverity] = useState('Whishlist');

const priorityColor = (priority === "Low") ? "#A8E440" : (priority === "Normal") ? "#E4CE40" : (priority === "High") ? "#E47C40" : "";
const severityColor = (severity === "Whishlist") ? "#70728F" : (severity === "Minor") ? "#40A8E4" : (severity === "Normal") ? "#40E47C" : (severity === "Important") ? "#E4A240" : (severity === "Critical") ? "#D35450" : "";
const typeColor = (type === "Bug") ? "#E44057" : (type === "Question") ? "#5178D3" : (type === "Disabled") ? "#40E4CE" : "";
const statusColor = (status === "New") ? "#70728f" : (status === "In progress") ? "#40a8e4" : (status === "Ready for test") ? "#e4ce40" : (status === "Closed") ? "#a8e440" : (status === "Needs info") ? "#e44057" : (status === "Rejected") ? "#a9aabc" : (status === "Postponed") ? "#5178d3" : "";

const handleSubjectChange = (event) => {
    setSubject(event.target.value);
};

const handleInputChangeDes = (event) => {
setDescription(event.target.value);
};

const handleSelectStatusChange = (event) => {
    setStatus(event.target.value);
};

const handleSelectSeverityChange = (event) => {
    setSeverity(event.target.value);
};

const handleSelectPriorityChange = (event) => {
    setPriority(event.target.value);
};

const handleSelectTypeChange = (event) => {
    setType(event.target.value);
};

const handleButtonClick = () => {
    const data = {
        subject: subject,
        description: description,
        status: status,
        type: type,
        severity: severity,
        priority: priority
    };

    if (subject.length > 0)
    {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('X_CSRFTOKEN'),
                'Authorization': 'Token ' + getToken()
            },
            body: JSON.stringify(data),
        });

        navigate('/');
    }

}

  return (
    <div className='container-externalCrea'>
        <div class="contentCrea">
            <div className='containerCrea'>
                <div className='top-divCrea'>
                    <h1>New Issue</h1>
                </div>
                <div className='bottom-divsCrea'>
                    <div className='left-bottom-divCrea '>
                        <div className='containerSubjectCrea'>
                        <input placeholder='Subject' className='subjectContainerCrea' type="text" value={subject} onChange={handleSubjectChange} />
                        <textarea
                            placeholder='Please add descriptive text to help others understand this issue'
                            value={description}
                            className='descriptionContainerCrea'
                            onChange={handleInputChangeDes}/>
                        </div>
                    </div>
                    <div className='right-bottom-divCrea'>
                        <div>
                            <select style={{backgroundColor: statusColor, textAlign: "left"}} className='status-dropdownCrea' id="dropdown" value={status} onChange={handleSelectStatusChange}>
                                <option value="New">New</option>
                                <option value="In progress">In progress</option>
                                <option value="Ready for test">Ready for test</option>
                                <option value="Closed">Closed</option>
                                <option value="Needs info">Needs info</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Postponed">Postponed</option>
                            </select>
                        </div>
                        <div className='container-typesCrea'>
                            <label className='labelTypesCrea'>
                                type
                            </label>
                            <select className='select-type-containerCrea' id="dropdown"  value={type} onChange={handleSelectTypeChange}>
                                <option value="Bug">Bug</option>
                                <option value="Question">Question</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                            <div className="circle-typeCrea" style={{ backgroundColor: typeColor}}></div>
                        </div>
                        <div className='container-typesCrea'>
                            <label className='labelTypesCrea'>
                                severity
                            </label>
                            <select className='select-type-containerCrea' id="dropdown"  value={severity} onChange={handleSelectSeverityChange}>
                                <option value="Whishlist">Whishlist</option>
                                <option value="Minor">Minor</option>
                                <option value="Normal">Normal</option>
                                <option value="Important">Important</option>
                                <option value="Critical">Critical</option>
                            </select>
                            <div className="circle-typeCrea" style={{ backgroundColor: severityColor}}></div>
                        </div>
                        <div className='container-typesCrea'>
                            <label className='labelTypesCrea'>
                                priority
                            </label>
                            <select className='select-type-containerCrea' id="dropdown"  value={priority} onChange={handleSelectPriorityChange}>
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                            </select>
                            <div className="circle-typeCrea" style={{ backgroundColor: priorityColor}}></div>
                        </div>
                    </div>
                </div>
                <div className='bottom-div '>
                    <button className='create-buttonCrea' onClick={handleButtonClick}>Create</button>
                </div>
            </div>
        </div>    
    </div>
  );
}

export default CreaIssue;