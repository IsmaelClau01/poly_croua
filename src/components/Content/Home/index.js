import React, { Component } from 'react';
import Header from '../Header/index';
import Footer from '../../Footer';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    return (
        <div classNameName='page-light home'>
            <Header active="Home" />
            <div className="image-defil"></div>
            <Footer />
        </div>
    );
}

export default Home;