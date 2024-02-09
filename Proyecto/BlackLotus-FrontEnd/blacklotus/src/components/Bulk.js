import React, { useState } from 'react';
import { changeUser, getToken } from '../Token';
import './css/Bulk.css';

function BulkInsert() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description] = useState('');
  const [priority] = useState('Low');
  const [status] = useState('New');
  const [type] = useState('Bug');
  const [severity] = useState('Whishlist');

  function getCookie(name) {
    let cookieValue = null;

    console.log(document)

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}

  const openLightbox = () => {
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    changeUser()
    if(subject.length > 0){

        const data = {
          subject: subject,
          description: description,
          status: status,
          type: type,
          severity: severity,
          priority: priority
        };
        
        fetch('http://127.0.0.1:8000/issues/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('X_CSRFTOKEN'),
                'Authorization': 'Token ' + getToken()
            },
            body: JSON.stringify(data),
        });
    
      };
    }
 
  return (
    <div>
      <div> 
          <button
            onClick={() => {openLightbox();}}
            className= "BulkStyle"
          > 
          </button>
          {lightboxOpen && (
            <div className="lightboxBulk">
              <div className='lightbox'>
                <button 
                  onClick={closeLightbox}
                  className="crossButtonBulk"
                  >
                </button>
                
                <h2>New bulk insert</h2>
                
                <textarea
                  className="BulkIssues"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Introduce subjects separated by commas."
                ></textarea>
                <div>
                  <button 
                    onClick={closeLightbox}
                    className="savebuttonBulk"
                    >Save
                  </button>
                  </div>
                </div>
            </div>)}
        </div>

    </div>
  );
}

export default BulkInsert;