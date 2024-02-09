import React, { useEffect, useState } from 'react';
import { changeUser, getToken, getUsername } from '../Token';
import NavBar from './NavBarProfile';
import './css/Profile.css';
import {useNavigate, useParams} from 'react-router-dom';
function Profile() {
  const [profile, setProfile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate()
  const {username} = useParams()
  const fetchProfileData = async (username) => {
    const URL = 'http://127.0.0.1:8000/profile/' + username + '/';
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
        setProfile(data);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData(username);
  }, [selectedUser,username]);

  const handleButtonClick = () => {
    const newSelectedUser = Number(document.getElementById('userSelector').value);
    setSelectedUser(newSelectedUser);
    changeUser(newSelectedUser);
    navigate('/profile/' + getUsername())
    window.location.reload()
    
  };
  const handleButtonClickEdit = () => {
    navigate('/edit/'+ getUsername())
  }
  let condition = false
  if(profile){
    condition = profile.user.username === getUsername();
  } 
  return (
    <div className='profile'>
      <div className='profile-col'>
        <div className='profile-image'>
          {profile && <img src={profile.profile_image.url_image} alt="Profile" />}
        </div>
        <div className="profile-info">
          {profile && <h1>{profile.user.first_name}</h1>}
          {profile && <h2>@{profile.user.username}</h2>}
          <hr />
          <div className='profile-bio'>
            {profile && <p>{profile.profile.bio}</p>}
          </div>
          {condition && (
          <div>
            <hr />
            <div className='profile-edit-button'>
                <button className='button-changeUser' onClick={handleButtonClickEdit}>EDIT</button>
            </div>
          </div>
        )}
        </div>
      </div>
          
      <div className='timeline-col'>
        <div className='profile-activity'>
          {profile &&<NavBar userProp={profile} />}
        </div>
      </div>

      <div className='change-profile-col'>
        {condition && (
          <div className='profile-change'>
            <div className='profile-select-user'>
                <select id="userSelector">
                  <option value={0}>bee</option>
                  <option value={1}>llpfdc</option>
                  <option value={2}>admin</option>
                </select>
            </div>
            <div className='profile-select-button'>
              <button className='button-changeUser' onClick={handleButtonClick}>CHANGE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
