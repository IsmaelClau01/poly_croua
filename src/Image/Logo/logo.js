import React from 'react';
import logo from './PolyCroua.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/home'><img src={logo} alt="PolyCROUA" className='logo'/></Link>
    );
}

export default Logo;