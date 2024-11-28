import React, { useState, useEffect } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../../../Image/Logo/logo';

const Header = props => {

    // const [state, stateFunc] = useState(0);

    // const addActive = (e) => {
    //     e.target.classList.add('active-on')
    // }

    // useEffect(() => {
    //     const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    //     const popoverList = popoverTriggerList.map((popoverTriggerEl) => {
    //       return new window.bootstrap.Popover(popoverTriggerEl)
    //     })
    // }, [])

    let listActive = [true,false,false,false,false]
    let i
    
    switch (props.active) {
        case 'Home':
            for (i in listActive) { i = false }
            listActive[0] = true
            break;
        case 'Cite':
            for (let index = 0; index < listActive.length; index++) {
                listActive[index] = false;
            }
            listActive[1] = true
            break;
        case 'Pedag':
            for (i in listActive) { i = false }
            listActive[2] = true
            break;
        case 'About':
            for (i in listActive) { i = false }
            listActive[3] = true
            break;
        case 'Contact':
            for (i in listActive) { i = false }
            listActive[4] = true
            break;
    }

    console.log(listActive)

    const test = "nav-link active-on"

    const pseudo = "Clau"
    const pseudoFirstLetter = pseudo.charAt(0)

    const [isDisconnectModal, setIsDisconnectModal] = useState(false)

    const navigate = useNavigate()
    const auth = getAuth()

    const signout = () => {
        signOut(auth)
        .then(() => {
            navigate('/login')}) 
        .catch((error) => {
            console.error('erreur', error)})
        
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark ps-3 banner-container">
            <div className="container-fluid">
                {<Logo />}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mb-3" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mt-3 home-left">
                        <li className="nav-item mx-2">
                            <Link className={ listActive[0] ? "nav-link active-on" : "nav-link" }
                             to="/home">Accueil</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className={ listActive[1] ? "nav-link active-on" : "nav-link" } 
                            to="/cite">Cité</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className={ listActive[2] ? "nav-link active-on" : "nav-link" }
                            >Pédagogique</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className={ listActive[3] ? "nav-link active-on" : "nav-link" }
                            >A propos</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className={ listActive[4] ? "nav-link active-on" : "nav-link" }
                            >Contact</Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="disconnect" onClick={showModalDisconnect}>{pseudoFirstLetter}</div> */}
                <div className='disconnect' onClick={signout}>Se deconnecter</div>
            </div>
        </div>
    );
}

export default Header;
