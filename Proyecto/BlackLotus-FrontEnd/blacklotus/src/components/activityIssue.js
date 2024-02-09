import React, { useEffect, useState} from 'react';
import { changeUser, getToken} from '../Token';
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

function user(idUser){
  if(idUser === 0) return "MarcChavez";
  else if(idUser === 1) return "a";
  else return "a";
}

function Act_Issue() {
  const [comment, setComment] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const username = "a";
  changeUser(0);

  const { id } = useParams()

  const url = `http://127.0.0.1:8000/activity/?id=${id}`;

  useEffect(() => {
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      }
    })
    .then(resp => resp.json())
    .then(resp => setComment(resp));
  }, []);

  return (
    <div>
      <div>
        {comment.map((comment, index) => {
          return (
              <>
                <div className='subheaderComments'>
                <div className='comment-pfp'>
                      <img src="https://www.cripto-valuta.net/wp-content/uploads/2022/11/shiba-inu.jpg" alt="Profile"/>
                  </div>
                  <div className='comment-text'>
                    <div className='containerCommentNameDate'>
                      <div>
                          <label className='CommentCreator'>
                              <a>{user(comment.user.username)}</a>
                          </label>
                      </div>
                      <div >
                          <label className='CommentDate'>{formatDate(comment.creationdate)}</label>
                      </div>
                    </div>
                    <div className='Comment-id-wrapper'>
                        <label className='CommentMessage'>{comment.field} has changed</label>
                        <br></br>
                        <label className='CommentMessage'>{comment.change}</label>
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

export default Act_Issue;
