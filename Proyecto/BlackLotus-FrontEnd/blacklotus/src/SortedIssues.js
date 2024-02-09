import React, { useState, useEffect } from 'react';
import { getToken } from '../Token';
import './css/Orden.css';

function SortedIssues() {
  const [sortedIssues, setSortedIssues] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    attribute: 'subject',
    order: 'asc',
  });

  useEffect(() => {
    const url = new URL('http://127.0.0.1:8000/issues/');
    const params = {
      SortBy: sortOptions.attribute,
      SortOrder: sortOptions.order,
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + getToken(),
      },
    })
      .then(resp => resp.json())
      .then(resp => {
        setSortedIssues(resp);
      });
  }, [sortOptions]);

  const handleSortChange = (attribute) => {
    setSortOptions(prevOptions => ({
      ...prevOptions,
      attribute: attribute,
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Sorted Issues</h2>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
        <span style = {{marginRight: '5px'}}>Subject</span>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => handleSortChange('subject')} className={"arrowUpStyle"} ></button>
              <button onClick={() => handleSortChange('-subject')} className={"arrowDownStyle"}></button>
            </div>
          </div>
          <span style = {{marginRight: '5px'}}>Status</span>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => handleSortChange('status')} className={"arrowUpStyle"}></button>
              <button onClick={() => handleSortChange('-status')} className={"arrowDownStyle"}></button>
            </div>
          </div>
          <span style = {{marginRight: '5px'}}>Type</span>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => handleSortChange('type')} className={"arrowUpStyle"}></button>
              <button onClick={() => handleSortChange('-type')} className={"arrowDownStyle"}></button>
            </div>
          </div>
          <span style = {{marginRight: '5px'}}>Severity</span>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => handleSortChange('severity')} className={"arrowUpStyle"}></button>
              <button onClick={() => handleSortChange('-severity')} className={"arrowDownStyle"}></button>
            </div>
          </div>
          <span style = {{marginRight: '5px'}}>Priority</span>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => handleSortChange('priority')} className={"arrowUpStyle"}></button>
              <button onClick={() => handleSortChange('-priority')} className={"arrowDownStyle"}></button>
            </div>
          </div>
        </div>
      </div>

      <ul>
        {sortedIssues.map(issue => (
          <li key={issue.id}>{issue.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default SortedIssues;
