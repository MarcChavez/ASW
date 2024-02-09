import React, { useEffect, useState} from 'react';
import { changeUser, getToken, getUsernameId} from '../Token';
import './css/ListarComments.css';
import { useParams } from 'react-router-dom';
import AddComment from './postComment';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}


function ListarComments() {
  const [comment, setComment] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState(null);
  const username = "a";
  changeUser(0);

  const { id } = useParams()

  useEffect(() => {
    
    fetch('http://127.0.0.1:8000/comment/' + id + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      }
    })
    .then(resp => resp.json())
    .then(resp => setComment(resp));
  }, []);

  const getImage = (idUser) => {
    if (comment != null && profile === null) fetchProfileData(idUser);
    if (profile != null)
      return profile.profile_image.url_image
}

const fetchProfileData = async (idUser) => {
 
  const URL = 'http://127.0.0.1:8000/profile/' +  getUsernameId(idUser) + '/';
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

  return (
    <div>
      <AddComment/>
      <div>
        {comment.map((comment, index) => {
          return (
              <>
                <div className='subheaderComments'>
                <div className='comment-pfp'>
                      <img src = {getImage(comment.creator)} alt="Profile"/>
                  </div>
                  <div className='comment-text'>
                    <div className='containerCommentNameDate'>
                      <div>
                          <label className='CommentCreator'>
                              <a>{getUsernameId(comment.creator)}</a>
                          </label>
                      </div>
                      <div >
                          <label className='CommentDate'>{formatDate(comment.creationDate)}</label>
                      </div>
                    </div>
                    <div className='Comment-id-wrapper'>
                        <label className='CommentMessage'>{comment.message}</label>
                    </div>
                  </div>
                </div>
                <hr/>
            </>
          )
        })}
      </div>
    </div>
  );
  
}

export default ListarComments;
