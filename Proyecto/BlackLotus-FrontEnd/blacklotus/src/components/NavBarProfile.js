import React, { useState } from 'react';
import './css/NavBar.css';

import {  getToken } from '../Token';
const NavBar = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  let componentToRender;
  
  switch (selectedOption) {
    case 'timeline':
      componentToRender = <Timeline profileProp={props.userProp}/>;
      break;
    case 'watchers':
      componentToRender = <Watchers profileProp={props.userProp}/>;
      break;
    case 'token':
      componentToRender = <Token/>;
      break;
    default:
      componentToRender = <Timeline profileProp={props.userProp}/>;
      break;
  }  
  return (
    <div className='bar'>
      <nav>
        <ul>
          <li onClick={() => handleOptionClick('timeline')}><a>Timeline</a></li>
          <li onClick={() => handleOptionClick('watchers')}><a>Watchers</a></li>
          <li onClick={() => handleOptionClick('token')}><a>Token</a></li>
        </ul>
      </nav>
      {componentToRender}
    </div>
  );
};

const Timeline = (props) => {
    function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    return (
      <div>
        {props.profileProp.profile_activity.timeline.map((activity, index) => (
          <React.Fragment key={index}>
            <div className='profile-activity'>
                <div className='profile-activity-pfp'>
                  <img src={props.profileProp.profile_image.url_image} alt="Profile" />
                </div>
                <div className='profile-activity-text'>
                  <h4>
                    User <span style={{ color: '#5a5b72' }}>{props.profileProp.user.username}</span> has updated the atribute "{activity.field}" from the issue with id <span style={{ color: '#1097a9' }}>#{activity.issueChanged}</span>
                  </h4>
                </div>
                <div className='profile-activity-date'>
                  <h5>{formatDate(activity.creationdate)}</h5>
                </div>
              
                </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};
const Watchers = (props) => {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  return (      
  <div>
    {props.profileProp.profile_activity.watchers.map((issue, index) => (
      <React.Fragment key={index}>
        <div className='profile-activity'>
            <div className='profile-activity-pfp'>
              <img src={props.profileProp.profile_image.url_image} alt="Profile" />
            </div>
            <div className='profile-activity-text'>
                <h4><span style={{ color: '#1097a9' }}>#{issue.id}</span> {issue.subject}</h4>
                
              
            </div>
            <div className='profile-activity-date'>
              <h5>{formatDate(issue.modifieddate)}</h5>
            </div>
          
            </div>
      <hr />
    </React.Fragment>
  ))}
</div>
    );
};

const Token = () => {
  return <div>{getToken()}</div>;
};

export default NavBar;