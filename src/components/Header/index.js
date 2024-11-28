import React, {useEffect} from 'react';
import Logo from '../../Image/Logo/logo';
import { NavLink } from 'react-router-dom';
import Landing from '../Landing';

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ps-3 banner-container">
            <div className="container-fluid justify-content-end mx-3 mt-3">
                <Logo />
            </div>
        </nav>
    );
}

export default Header;