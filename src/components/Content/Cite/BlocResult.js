import React, { useState, Fragment } from 'react';
import BlocList from './BlocList';
import InfoModal from './InfoModal';

const BlocResult = (props) => {

    const [blocListHeight, setBlocListHeight] = useState(0)

    const blocResultState = props.blocResultState ? (
        <div className='cite-bloc-result-container mt-3'>
            <div className='row bloc-list mx-auto'>
                <BlocList number='29' reset={props.reset} />
            </div>
        </div>
    ) : (<div></div>)

    return (
        <Fragment>
            { blocResultState }
        </Fragment>
    );
}

export default BlocResult;
