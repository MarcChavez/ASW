import './css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListarComments from './ListarComments'
import Act_Issue from './activityIssue';

function Act_Comments() {

const [show, setShow] = useState(true)
const [cssComments, setCssComm] = useState("history-tab-active")
const [cssAct, setCssAct] = useState("history-tab")

const { id } = useParams();

const handleTextClickComments = () => {

    setShow(true);
    setCssAct("history-tab")
    setCssComm("history-tab-active")

}; 

const handleTextClickActi = () => {

    setShow(false);
    setCssComm("history-tab")
    setCssAct("history-tab-active")

};      


return (
  <div className='issue-page'>
    <header>
        <nav class="history-tabs">
                <a className={cssComments} onClick={handleTextClickComments} title="">Comments</a>
                <a className={cssAct} onClick={handleTextClickActi} title="">Activities</a>
            </nav>
    </header>
    {(show) ? <ListarComments/> : <Act_Issue/>}
  </div>
);
}

export default Act_Comments;
