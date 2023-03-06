import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function ModNav(props){
    const navStyle = {
        color: 'black'
      };

    if(props.role<3){
        return(
            <nav>
                <h3>exampleCRM™</h3>
                <ul className='nav-links'>
                    <Link style={navStyle} to="/users"><li>Users</li></Link>
                    <Link style={navStyle} to="/companies"><li>Companies</li></Link>
                    <Link style={navStyle} to="/notes"><li>Trade Notes</li></Link>
                    <Link style={navStyle} to="/contact"><li>Contact People</li></Link>
                    <Link style={navStyle} to="/brands"><li>Brands</li></Link>
                </ul>
                <h4>
                    <Link style={navStyle} to="/me">User Profile</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link style={navStyle} to="/logout">Logout</Link>
                </h4>
            </nav>
        );
    }
    return("");
}

export default ModNav;