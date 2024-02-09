import './css/issue.css'
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de Quill
import Subject from './subject'
import Description from './description'
import Attachments from './attachments';
import StatusIssue from './statusIssue';
import Act_Comments from './attachComm';
import Watchers from './watchersIssue';
import Asign from './asignIssue';
import OptionsIssue from './optionsIssue';

function EditIssue() {

  /*
  <div className='MainContainer'>
    <div className='main-div'>
        <Subject/>
        <hr />
        <Description/>
        <hr/>
          <Attachments />
    </div>
    <div className='side-bar'> 
    <div className='sub-side-bar'>
        <StatusIssue/>
        </div>
    </div>
  </div>
  */

return (
  <div className='MainContainer'>
    <div className='main-div'>
        <Subject/>

        <Description/>
        <hr/>
          <Attachments />
        <hr/>
        <Act_Comments/>
    </div>
    <div className='side-bar'> 
      <div className='sub-side-bar'>
          <StatusIssue/>
          <hr/>
          <Asign/>
          <hr/>
          <Watchers/>
          <hr/>
          <OptionsIssue/>
      </div>
    </div>
  </div>
);
}

export default EditIssue;
