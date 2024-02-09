import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../Token';
import './css/issue.css'
import { useParams } from 'react-router-dom';


function SubjectIssue() {
const [issue, setIssue] = useState(null)
const [profile, setProfile] = useState(null);
var foto = false;

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/';


  const fetchProfileData = async () => {
    const URL = 'http://127.0.0.1:8000/profile/' + issue.data.creator + '/';
    try {
      if (!foto)
      {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + getToken()
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        foto = true;
      } else {
        throw new Error('Failed to fetch profile');
      }
    }
    } catch (error) {
      console.error(error);
    }

};

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
  } catch (error) {
  console.error(error);
  }
  };

useEffect(() => {
fetchIssue();
}, []);

const [isEditing, setIsEditing] = useState(false);
const [text, setText] = useState('');

const handleTextClick = () => {
setIsEditing(true);
setText(issue.data.subject);
};

const getImage = () => {
    if (issue != null && profile === null) fetchProfileData();
    if (profile != null)
      return profile.profile_image.url_image
}

function formatDate() {
    const date = new Date(issue.data.creationdate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}


const handleInputChange = (event) => {
setText(event.target.value);
};


const handleButtonClick = () => {
const data = {
  subject: text,
};

setIsEditing(false);

issue.data.subject = text;

fetch(URL, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
'X-CSRFToken': getCookie('X_CSRFTOKEN'),
'Authorization': 'Token ' + getToken()
},
body: JSON.stringify(data),
});

setText(issue.data.subject);
};

const handleButtonCancelClick = () => {
setIsEditing(false);
};

const block = issue && issue.data.blocked

return (

  <div className='issue-page'>
        <div className='id-subject'>
            {isEditing ? (
            <div>
                <input className="edit-issue-input"
                      type="text"
                      value={text}
                      onChange={handleInputChange}
                />
                <button className="save-button" onClick={handleButtonClick}></button>
                <button className="cross-button" onClick={handleButtonCancelClick}></button>
            </div>
            ) : (
            <div className='subject-id-wrapper'>
                <h1 className="detail-title-text">
                    {issue &&
                    <div className='id-issue'>#{issue.data.id}</div>
                    }
                    <span onClick={handleTextClick}>{issue && <h2 className='issue-subject'>{issue.data.subject}
                </h2>}</span>
                </h1>
            </div>
            )}
        </div>
        <div>
          {issue && block && (
            <div className="BlockmotiveContainer">
              Blocked: {issue.data.blocked_motive}
            </div>
          )}
        </div>
        <div className='subheader'>
          <div className='date-user-wrap'>
              <div className='issue-texts'>
                  <h4>
                      <a>Created by {issue && issue.data.creator}</a>
                  </h4>
                  <h5 className='date'>{issue && formatDate()}</h5>
              </div>
            </div>
            <div className='issue-pfp'>
                {issue && <img src={getImage()} alt="Profile"/>}
            </div>
    </div>
  </div>
);
}

export default SubjectIssue;
