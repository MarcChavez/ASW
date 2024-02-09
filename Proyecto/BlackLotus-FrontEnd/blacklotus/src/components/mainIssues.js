import React, { useEffect, useState } from 'react';
import { getToken,getUsernameId } from '../Token';
import './css/Issues.css';
import {Link} from 'react-router-dom';
import BulkInsert from './Bulk';
import './css/Orden.css';
import './css/Filtros.css'
function MainIssues() {
  const [issues, setIssues] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssigned, setSelectedAssigned] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const handleTypeChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedType(selectedValues);
  }; 
   const handleSeverityChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedSeverity(selectedValues);
  };
 
 
  const handlePriorityChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedPriority(selectedValues);
  };
 
 
  const handleStatusChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedStatus(selectedValues);
  };
 
 
  const handleAssignedChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedAssigned(selectedValues);
  };
 
 
  const handleCreatorChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCreator(selectedValues);
  };
 
 
    const [isFiltrosOpen, setIsFiltrosOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Inclusive');
 
 
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
 
 
    const handleButtonClick = () => {
      setIsFiltrosOpen(!isFiltrosOpen);
    };
  const [sortOptions, setSortOptions] = useState({
    attribute: 'subject',
    order: 'asc',
  });
  useEffect(() => {
    const params = {//ordenar
      SortBy: sortOptions.attribute,
      SortOrder: sortOptions.order,
      'Type of filter': (selectedOption),
      Types: (selectedType),
      Priorities: (selectedPriority),
      Severities: (selectedSeverity),
      Statuses: (selectedStatus),
      AssignedTo: (selectedAssigned),
      CreatedBy: (selectedCreator),
    };
    const url = new URL('http://127.0.0.1:8000/issues/');
    url.search = new URLSearchParams(params).toString();
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      }
    })
      .then(resp => resp.json())
      .then(data => setIssues(data))
      .catch(error => console.error(error));
  }, []);

  const handleSortChange = (attribute) => {
    setSortOptions(prevOptions => ({
      ...prevOptions,
      attribute: attribute,
    }));
    
    const params = {
      SortBy: attribute,
      SortOrder: sortOptions.order,
      'Type of filter': selectedOption,
      Types: selectedType, 
      Priorities: selectedPriority,
      Severities: selectedSeverity,
      Statuses: selectedStatus,
      AssignedTo: selectedAssigned,
      CreatedBy: selectedCreator,
    };
  
    const url = new URL('http://127.0.0.1:8000/issues/');
    url.search = new URLSearchParams(params).toString();
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken()
      }
    })
      .then(resp => resp.json())
      .then(data => setIssues(data))
      .catch(error => console.error(error));
  };

  const AllIssues = () => {
    setIsFiltrosOpen();
    setSelectedSeverity([]);
    setSelectedAssigned([]);
    setSelectedPriority([]);
    setSelectedStatus([]);
    setSelectedCreator([]);
    setSelectedType([]);
    fetch(`http://127.0.0.1:8000/issues/`, {
    method:'GET',
    headers: {'Content-Type':'application/json','Authorization': 'Token ' + getToken() }
    }).then(resp => resp.json()).then(resp => setIssues(resp))
 
}
  const getClassName = (num) => {
    switch (num) {
      case 1:
        return "level-0";
      case 2:
        return "level-1";
      case 3:
        return "level-2";
      case 4:
        return "level-3";
      case 5:
        return "level-4";
      default:
        return "";
    }
  };

  const getTextStatus = (num) => {
    switch (num) {
      case 1:
        return "New";
      case 2:
        return "In progress";
      case 3:
        return "Ready for test";
      case 4:
        return "Closed";
      case 5:
        return "Needs info";
      case 6:
        return "Rejected";
      case 7:
        return "Postponed";
      default:
        return "";
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const getIsBloq = (issue_bloq) => {
    if (issue_bloq) return "row-issue-bloq"
    else return "row-issue"
  };
  return (
    <div>
      <div className='Globalfiltros'>
       <button className="ActivateFiltrosButton"onClick={handleButtonClick}>
         {isFiltrosOpen ? 'Close Filters' : 'Filters'}
       </button>
       {isFiltrosOpen && (
         <div className="Filtros">
           <br></br>
           <button onClick={handleSortChange}> Update Filters </button>
           <button onClick={AllIssues}> Clean Filters</button>
           <br></br>
           <label>
             <input
               type="radio"
               value="Inclusive"
               defaultChecked={true}
               checked={selectedOption === 'Inclusive'}
               onChange={handleOptionChange}
             />
             Inclusive
           </label>
           <label>
             <input
               type="radio"
               value="Exclusive"
               checked={selectedOption === 'Exclusive'}
               onChange={handleOptionChange}
             />
             Exclusive
           </label>
           <ul className='DropdownFiltros'>
               <li>
                   <select name="type" id="Type" multiple onChange={handleTypeChange}>
                        <option value="type" disabled>Type</option>
                        <option value="Bug">Bug</option>
                        <option value="Question">Question</option>
                        <option value="Disabled">Disabled</option>
                    </select>
               </li>
               <li>
                   <select name="severity" id="severity" multiple onChange={handleSeverityChange}>
                        <option value="severity" disabled>Severity</option>
                        <option value="Whishlist">Whishlist</option>
                        <option value="Minor">Minor</option>
                        <option value="Normal">Normal</option>
                        <option value="Important">Important</option>
                        <option value="Critical">Critical</option>
                    </select>
               </li>
               <li>
                   <select name="priority" id="priority" multiple onChange={handlePriorityChange}>
                        <option value="priority" disabled>Priority</option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                    </select>
               </li>
               <li>
                   <select name="status" id="status" multiple onChange={handleStatusChange}>
                      <option value="status" disabled>Status</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready for Test">Ready for Test</option>
                      <option value="Closed">Closed</option>
                      <option value="Needs Info">Needs Info</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Postponed">Postponed</option>
                   </select>
               </li>
               <li>
                   <select name="assignations" id="assignations" multiple onChange={handleAssignedChange}>
                       <option value="assignations" disabled> Assignations</option>
                       <option value="Unassigned"> Unassigned </option>
                       <option value="a"> a</option>
                       <option value="b"> b</option>
                       <option value="c"> c</option>
                          
                   </select>
               </li>
               <li>
                   <select name="creator" id="creator" multiple onChange={handleCreatorChange}>
                       <option value="creator" disabled>Created By</option>
                       <option value="a">a</option>
                       <option value="b">b</option>
                       <option value="c">c</option>
                   </select>
               </li>
           </ul>
         </div>
       )}
     </div>
     <div className='bulk-insert-comp'><BulkInsert/></div>
      <div className='orderBy'>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex' }}>
            <span style = {{marginRight: '5px'}}>Type</span>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column',marginRight:'2rem' }}>
                  <button onClick={() => handleSortChange('type')} className={"arrowUpStyle"}></button>
                  <button onClick={() => handleSortChange('-type')} className={"arrowDownStyle"}></button>
                </div>
              </div>
              <span style = {{marginRight: '5px'}}>Severity</span>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column',marginRight:'1rem' }}>
                  <button onClick={() => handleSortChange('severity')} className={"arrowUpStyle"}></button>
                  <button onClick={() => handleSortChange('-severity')} className={"arrowDownStyle"}></button>
                </div>
              </div>
              <span style = {{marginRight: '5px'}}>Priority</span>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column',marginRight:'4rem' }}>
                  <button onClick={() => handleSortChange('priority')} className={"arrowUpStyle"}></button>
                  <button onClick={() => handleSortChange('-priority')} className={"arrowDownStyle"}></button>
                </div>
              </div>
            <span style = {{marginRight: '5px'}}>Subject</span>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column',marginRight:'37rem' }}>
                  <button onClick={() => handleSortChange('subject')} className={"arrowUpStyle"} ></button>
                  <button onClick={() => handleSortChange('-subject')} className={"arrowDownStyle"}></button>
                </div>
              </div>
              <span style = {{marginRight: '5px'}}>Status</span>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column',marginRight:'7rem' }}>
                  <button onClick={() => handleSortChange('status')} className={"arrowUpStyle"}></button>
                  <button onClick={() => handleSortChange('-status')} className={"arrowDownStyle"}></button>
                </div>
              </div>
              <span style = {{marginRight: '7rem'}}>Modified</span>     
              <span style = {{marginRight: '5px'}}>Assign to</span>
            </div>
            
        </div>
      </div>
      <div className='table'>
        
        {issues.map((issue, index) => (
          <React.Fragment key={index}>
            <div className={getIsBloq(issue.blocked)}>
              <div className={getClassName(issue.type)} />
              <div className={getClassName(issue.severity)} />
              <div className={getClassName(issue.priority)} />
              <div className='issue-text'>
                <Link to={"issue/"+issue.id} className="nav-link"><a>
                  <span style={{ color: '#1097a9' }}>#{issue.id} </span>  
                  {issue.subject} 
                </a></Link>
              </div>
              <div className='issue-status'>
                <a>{getTextStatus(issue.status)}</a>
              </div>
              <div className='issue-date'>
                <a>{formatDate(issue.modifieddate)}</a>
              </div>
              {issue.asignedTo[0] &&(
              <div className='issue-assign'>        
                <Link to={'/profile/'+ getUsernameId(issue.asignedTo[0])}  className="nav-link">
                  {getUsernameId(issue.asignedTo[0])}
                </Link>
              </div>)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MainIssues;
