import React, { Component } from 'react';
import Header from '../Header/index';
import ImageDefil from '../../../Image/Background/room.jpg';

class Contact extends Component {
    render () {
        return (
            <div className='page-light home'>
                <Header active="Contact" />
                <img className='image-defil' src={ImageDefil} alt="" />
            </div>
        );
    }
}

export default Contact;