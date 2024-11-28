import React from 'react';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom'
import HouseBg from '../../Image/Background/home.png';

const Landing = () => {
    return (
        <Fragment>
            <div className='container mt-0 mx-5'>
                <div className="row spacer-top"></div>
                    <div className='row'>
                        <div className='col-8'>
                            <div className='col-12 home-left'>
                                <div className='display-6'>
                                    Bienvenu sur le site <br />
                                    <p className='mt-2 welcome-style'><span className='display-2'>Poly Univers-cité</span></p>
                                </div>
                                <p className='text-center mt-5'>
                                    <Link to="/signup"><button className="btn btn-success btn-signup ">Inscription</button></Link>
                                </p>
                                <p className='mt-4 text-center little-text'>
                                    Vous avez déjà un compte ? <Link to="/login" className='connect-link ps-2'> Connectez-vous </Link>
                                </p>
                            </div>
                            {/* <p className='mt-5'>
                                <Link to="/home"><button className="btn btn-success">Contenu</button></Link>
                            </p> */}
                        </div>
                        {/* <div className='col-4'>
                            <img className='house-bg' src={HouseBg} alt="" />
                        </div> */}
                    </div>
                    <Outlet />
            </div>
        </Fragment>
    );
}

export default Landing;
