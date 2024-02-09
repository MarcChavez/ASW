import React, { useState } from 'react';
import { changeUser, getToken} from '../Token';
import './css/AddComment.css'
import { useParams } from 'react-router-dom';

function AddComment() {
  const [comment, setComment] = useState('');
  const [Editing, setIsEditing] = useState(false);
  const { id } = useParams()
  function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
  }
  
  const handleComment = (event) => {
    setIsEditing(true);
    setComment(event.target.value);
  };

  const handleButtonCancelComment = () => {
    setIsEditing(false);
  };
  

  changeUser()

  const handleButtonComment = () => {
    setIsEditing(true);
    const data = {
      comment: comment,
    };
    
    fetch('http://127.0.0.1:8000/comment/'+id+'/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token '+ getToken()
        },
        body: JSON.stringify(data),
    });
    setIsEditing(false);
  };

  return (
    <div>
      <br></br>
      <div>
        {Editing ? (
          <div>
            <table>
              <tr>
                <td>
                  <textarea
                    className="Commentinput"
                    value={comment}
                    onChange={handleComment}
                    placeholder="Type a new comment here"
                  ></textarea>
                </td>
                <td className="ButtonPositionComment">
                  <br></br>
                  <button className="save-buttonComments" onClick={handleButtonComment}></button>
                  <button className="cross-buttonComments" onClick={handleButtonCancelComment}></button>
                </td>
              </tr>
            </table>
          </div>
        ) : (
          <div className="Commentwrapper">
            <span onClick={handleComment}>Type a new comment here</span> 
          </div>
        )}
      </div>
    </div>
  );
  
  
 
}
export default AddComment;

