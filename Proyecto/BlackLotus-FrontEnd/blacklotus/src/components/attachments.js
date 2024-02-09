import React, { useState, useEffect } from 'react';
import { getToken, getCookie } from '../Token';
import './css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill
import { useParams } from 'react-router-dom';


function Attachments() {
const [attachments, setAttachments] = useState(null)

const { id } = useParams();

const URL = 'http://127.0.0.1:8000/issue/'+id+'/attachment';

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
            setAttachments(data);
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

const deleteAttachmentButton = (name) => {
    const urlWithQueryParam = `${URL}?fileName=${name}`;
    fetch(urlWithQueryParam, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
        }
    });

    const updatedAttachments = attachments.filter(attachment => attachment.archivo.slice(1) !== name);

    // Actualizar el estado con el nuevo array sin el componente eliminado
    setAttachments(updatedAttachments);
};


const addAttachment = async (formData) => {
    const response = await fetch('http://127.0.0.1:8000/issue/'+id+'/attachment', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('X_CSRFTOKEN'),
            'Authorization': 'Token ' + getToken()
        },
        body: formData
    });
    if (response.ok) {
        const data = await response.json();

        fetchIssue();
      } 
  };

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    event.preventDefault();

    const formData = new FormData();

    formData.append('upfile', selectedFile);
    
    addAttachment(formData);
}
    

return (
    <div className='issue-page'>
        <div className='attachments-header'>
            <h3 className='attachments-title'>
                {attachments && attachments.length} Attachments
            </h3>
            <label className="file-label">
                <input type="file" name="upfile" className="hidden-file-input" onChange={handleFileChange} />
                <button className="disable-button"></button>
            </label>
        </div>
        <div className='attachment-list' style={{ maxHeight: '500px',overflowY: 'auto' }}>    
            {attachments && attachments.map(attachment => {
                return  (
                    <>
                        <div className="single-attachment">
                            <h5 > {attachment.archivo.slice(1)} </h5>
                            <button className='delete-button-atachment' onClick={() => deleteAttachmentButton(attachment.archivo.slice(1))}></button>
                        </div>
                        <hr/>
                    </>
                )
            })}
        </div>
    </div>
);
}

export default Attachments;