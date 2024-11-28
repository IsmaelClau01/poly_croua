import React, { Component } from 'react';
import Header from '../Header/index';
import ImageDefil from '../../../Image/Background/room.jpg';

class Pedag extends Component {
    render () {
        return (
            <div className='page-light home'>
                <Header active="Pedag" />
                <img className='image-defil' src={ImageDefil} alt="" />
            </div>
        );
    }
}

export default Pedag;