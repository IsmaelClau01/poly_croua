import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
    return (
        <div className='row footer'>
            <div className='col footer-left pt-4'>
                © 2024
            </div>
            <div className='col footer-rigt pt-4'>
                <div className='col-4'>
                    Nous contactez :
                </div>
                <div className='col-8 contact-footer'>
                    <p className='pb-3'>
                        <FaPhoneAlt className='footer-icon'/>
                        <span className='spacer-icon'>+261349329234</span>
                    </p>
                    <p className='pb-3'>
                        <FaFacebook className='footer-icon'/>
                        <span className='spacer-icon'>Claudio Ismaël RALAISEHENO</span>
                    </p>
                    <p>
                        <IoIosMail className='footer-icon'/>
                        <span className='spacer-icon'>ismael02clau@gmail.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
