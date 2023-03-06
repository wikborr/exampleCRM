import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Nav(props){
    const navStyle = {
        color: 'black'
      };
    if(props.role===4){
        return(
            <nav>
                <h3>exampleCRM™</h3>
                <h4>
                    <Link style={navStyle} to="/">Login</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link style={navStyle} to="/register">Register</Link>
                </h4>
            </nav>
        );
    }
    return("");
}

export default Nav;