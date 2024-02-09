import React, { useState, useEffect } from 'react';
import { changeUser, getToken,getCookie, getUsername } from '../Token';
import './css/Watchers.css';
import { useParams } from 'react-router-dom';

function Watchers() {
  const [watcherName, setWatcherName] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [beePick, setBee] = useState(false);
  const [adminPick, setAdmin] = useState(false);
  const [lluisPick, setLluis] = useState(false);
 
  const { id } = useParams();
  
  const openLightbox = () => {
    setLightboxOpen(true);
  };
  
  const realCloseLightbox = () => {
    setLightboxOpen(false)
  };

  const handleWatcherNameChange = (event) => {
    setWatcherName(event.target.value);
  };

  const closeLightbox = () => {
    const data = {
      watchers: watcherName
    };

      fetch('http://127.0.0.1:8000/issue/' + id + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('X_CSRFTOKEN'),
          'Authorization': 'Token ' + getToken()
        },
        body: JSON.stringify(data),
      });
      realCloseLightbox();
  };


  const handleButtonAddMe = () => {
    setWatcherName(getUsername)
    const data = {
      asignTo: getUsername()
    };

        fetch('http://127.0.0.1:8000/issue/' + id + '/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
          },
          body: JSON.stringify(data),
        })
  };

  const handleButtonClick = () => {
    const data = {
      asignTo: watcherName
    };
    if (watcherName != "")
    {
        fetch('http://127.0.0.1:8000/issue/' + id + '/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
          },
          body: JSON.stringify(data),
        });
    }
  
   realCloseLightbox();
    
  };

  const handleButtonPickBee = () => {
        if (beePick)
        {
          setBee(false);
            setWatcherName("");
        }
        else{
          setWatcherName("bee");
          setBee(true);
          setAdmin(false);
          setLluis(false);
        }
    };

    const handleButtonPickAdmin = () => {
        if (adminPick)
        {
            setAdmin(false);
            setWatcherName("");
        }
        else{
          setWatcherName("admin");
          setAdmin(true);
          setBee(false);
          setLluis(false);
        }
    };

    const handleButtonPickLluis = () => {
      
      if (lluisPick)
      {
          setLluis(false);
          setWatcherName("");
      }
      else{
        setWatcherName("llpfdc");
        setLluis(true);
        setAdmin(false);
        setBee(false);
      }
   
    };

  return (
    <div>
    <label>Assigned</label>
    <div>
        {watcherName && (
        <div className='watcher-Profiles'>
            <a>
                {watcherName}
            </a>
    </div>
        )}
    </div>
    <br></br>
    <div>
        <button className='boton-Watchers'
                onClick={()=> {openLightbox();}}>
                    + Add Assigned
        </button>
        <button className='boton-WatchersMe'
                onClick={()=> {handleButtonAddMe();}}>
            Assign to me
        </button>
        {lightboxOpen && (
        <div className="lightboxDeadline">
            <br></br>
            <button
                    onClick={realCloseLightbox}
                    className="crossButtonWatchers"
            >
            </button>
            <br></br>
            <h2>+ Add Assigned</h2>
            <br></br>
            <div className='watcher-Profiles' onClick={handleButtonPickBee}>
                <label className={beePick ? 'watcher-Profiles-label' : 'watcher-ProfilesSelected'} onClick={handleButtonPickBee}>
                    bee
                </label>
            </div>
            <div className='watcher-Profiles' onClick={handleButtonPickLluis}>
                <label className={lluisPick ? 'watcher-Profiles-label' : 'watcher-ProfilesSelected'} onClick={handleButtonPickBee}>
                  llpfdc
                </label>
            </div>
            <div className='watcher-Profiles' onClick={handleButtonPickAdmin}>
                <label className={adminPick ? 'watcher-Profiles-label' : 'watcher-ProfilesSelected'} onClick={handleButtonPickBee}>
                    admin
                </label>
            </div>
            <br></br>
            <button onClick={closeLightbox} className="savebuttonDeadline">
                Save
            </button>
        </div>
        )}
    </div>
</div>
  );
}

export default Watchers;