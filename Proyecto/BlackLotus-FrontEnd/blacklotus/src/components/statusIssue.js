import React, { useState, useEffect } from 'react';
import EditStatus from './editStatusesFolder/editStatus';
import EditType from './editStatusesFolder/editType';
import EditSeverity from './editStatusesFolder/editSeverity';
import EditPriority from './editStatusesFolder/editPriority';
import './css/issue.css'


function StatusIssue() {


return (

  <div>
    <EditStatus/>
    <EditType/>
    <EditSeverity/>
    <EditPriority/>
  </div>
);
}

export default StatusIssue;
