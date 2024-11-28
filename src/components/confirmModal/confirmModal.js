import React from 'react';

const ConfirmModal = (props) => {
    return (
        <div className='confirm-modal' onClick={props.close}>
            <div className='row' style={{ color: 'black' }}>
                <div className='confirm-modal-content'>
                    <p>{props.content}</p>
                </div>
                <div className='confirm-modal-footer'>
                    <button className='btn'>OK</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;