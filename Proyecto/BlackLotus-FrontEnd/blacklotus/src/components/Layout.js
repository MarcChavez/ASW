import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';
import { getUsername } from '../Token';

function Layout() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to='/'  className="nav-link"> Home </Link>
                        </li>
                        <li class="nav-item active">
                            <Link to='/create' className="nav-link"> Create Issue </Link>
                        </li>
                        <li class="nav-item active">
                            <Link to={'/profile/'+ getUsername()}  className="nav-link"> Profile </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div> 
    
    );

}

export default Layout;