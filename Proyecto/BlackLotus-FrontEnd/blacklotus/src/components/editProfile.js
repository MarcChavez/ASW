import './css/EditProfile.css';
import { useState, useEffect } from 'react';
import { getToken, getUsername } from '../Token';
import { useNavigate, useParams } from 'react-router-dom';

function EditProfile() {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();

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
        setBio(data.profile.bio);
        setEmail(data.user.email);
        setFullName(data.user.first_name);
        setImg(data.profile_image.url_image);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Realiza las operaciones necesarias con el archivo seleccionado, como enviarlo al servidor
    const formData = new FormData();
    formData.append('profile', file);
    addPhoto(formData);
  };

  const addPhoto = async (formData) => {
    const URL = 'http://127.0.0.1:8000/profile/' + username + '/';
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'Authorization': 'Token ' + getToken()
      },
      body: formData
    });
    if (response.ok) {
      navigate('/');
    } else {
      throw new Error('Failed to edit profile');
    }
  };

  useEffect(() => {
    fetchProfileData(username);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    var jsonUser = {};
    if (bio !== '') {
      jsonUser.bio = bio;
    }
    if (email !== '') {
      jsonUser.email = email;
    }

    if (fullName !== '') {
      jsonUser.first_name = fullName;
    }

    const URL = 'http://127.0.0.1:8000/profile/' + username + '/';
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      },
      body: JSON.stringify(jsonUser)
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='edit-profile-data'>
      <div className='profile-image-edit'>
        <h2>User Settings</h2>
        <div className='profile-image-image'>
          {profile && <img src={img} alt="Profile" />}
        </div>
        <div className='profile-edit-button'>
          <label>Change Photo</label>
          <input type='file' className='button-changePhoto' onChange={handleFileChange} accept='image/*' />        
        </div>
      </div>
      <div className='edit-user'>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type='email'
            required
            value={getUsername()}
            disabled
          />
          <label>Email</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Full name</label>
          <input
            type='text'
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Bio</label>
          <textarea
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button>SAVE</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
