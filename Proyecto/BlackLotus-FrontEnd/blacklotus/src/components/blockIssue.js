import React, { useState, useEffect } from 'react';
import { changeUser, getToken } from '../Token';
import './css/Block.css';
import { useParams } from 'react-router-dom';
import { getCookie } from '../Token';

function Block() {
  const [blocked_motive, setMotive] = useState('');
    const [block, setBlock] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [issue, setIssue] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    console.log(getToken())
    fetch("http://127.0.0.1:8000/issue/"+id+"/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      }
    })
      .then(resp => resp.json())
      .then(data => setIssue(data)).then(issue => console.log(issue.subject))
      .catch(error => console.error(error));
  }, []);


  const openLightbox = () => {
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    if (blocked_motive.length > 0) {
      const data = {
        blocked_motive: blocked_motive,
        blocked: true
      };
  
      fetch("http://127.0.0.1:8000/issue/"+id+"/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('X_CSRFTOKEN'),
          'Authorization': 'Token ' + getToken()
        },
        body: JSON.stringify(data),
    })
      .then(resp => resp.json()).then(data => setBlock(data.blocked))
      .catch(error => console.error(error));
    }
  };
  

  changeUser(0)

  const handleButtonClick = async () => {
    if (block) {
      // Desbloquear
      setMotive('');
      const data = {
        blocked: false
      };

      fetch("http://127.0.0.1:8000/issue/"+id+"/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('X_CSRFTOKEN'),
          'Authorization': 'Token ' + getToken()
        },
        body: JSON.stringify(data),
    })
      .then(resp => resp.json()).then(data => setBlock(data.blocked))
      .catch(error => console.error(error));
      
    } else {
      openLightbox();
    }
  };


const changeButton = () =>
{
    if (block){
        return 'blockedStyle'
    }
    else
        return 'unblockedStyle';
}

  return (
    <div>
        <div> 
          <button
            onClick={() => {handleButtonClick();}}
            
            className={changeButton()}
          >
          </button>
          {lightboxOpen && (
            <div className="lightboxBlock">
              <br></br>
              <button 
                onClick={closeLightbox}
                className="crossButtonBlock"
                >
              </button>
              <br></br>
              <h2>Blocking Issue</h2>
              <br></br>
              <textarea
                className="blockmotive"
                value={blocked_motive}
                onChange={(event) => setMotive(event.target.value)}
                placeholder="Please explain the motive."
              ></textarea>
              <br></br>
              <button 
                onClick={closeLightbox}
                className="savebuttonBlock"
                >Save
              </button>
            </div>)}
        </div>
    </div>
  );
  
}

export default Block;
