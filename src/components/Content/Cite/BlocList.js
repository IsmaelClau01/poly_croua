import React, { Fragment, useState, useEffect } from 'react';
import InfoModal from './InfoModal';
import { IoReturnUpBack } from 'react-icons/io5';

const BlocList = ({ number, reset}) => {

    // const totalHeight
    const divs = [<p className='list-title'>Liste des blocs</p>]

    const pageCount = (number, recordsPerPage) => {
        return Math.ceil(number / recordsPerPage)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [totalNumber, setTotalNumber] = useState(number)

    const [currentBloc, setCurrentBloc] = useState(0)
    const [currentDoor, setCurrentDoor] = useState(1)
    const [currentFirstIndex, setCurrentFirstIndex] = useState(1)

    const recordsPerPage = 8
    const lastIndex = (currentPage * recordsPerPage) + (36*currentBloc)
    const firstIndex = lastIndex - recordsPerPage
    const nPage = Math.ceil(totalNumber / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    console.log(lastIndex);

    const doorDivs = [
        <div>
            
            <p className='list-title mx-5'>
            <IoReturnUpBack onClick={reset} className='return-icon'/>
                <span className='mx-2'>Liste des portes dans le bloc {currentBloc+1}</span>
            </p>
        </div>]
    const [isDoorShown, setIsDoorShown] = useState(false)
    
    const [isModalShown, setIsModalShown] = useState(false)
    const showModal = (door) => {
        setCurrentDoor(door)
        setIsModalShown(true)
    }
    const hideModal = () => {
        setIsModalShown(false)
    }
    let j=currentDoor
    for (let i = firstIndex; i < lastIndex; i++) {
        
        doorDivs.push(
            <div key={i} className='col-sm-4 col-md-3 col-lg-3 mt-3 line-bloc'>
                <button onClick={() => showModal(i+1)} className='btn btn-bloc bloc'>P{i+1}</button>
            </div>
        )
        j++
    }   

    const showDoorList = (blocNum) => {
        setIsDoorShown(true)
        setTotalNumber(36)
        setCurrentBloc(blocNum)
        setCurrentDoor(blocNum*36+1)
        setCurrentPage(1)
    }

    for (let i = firstIndex; i < lastIndex; i++) {
        divs.push(
            <div key={i} className={`col-sm-4 col-md-3 col-lg-3 mt-3 line-bloc ${i > number-1 ? 'hideFillingBloc' : ''}`}>
                <button onClick={() => showDoorList(i)} className='btn btn-bloc bloc' id={`bloc ${i+1}`}>B{i + 1}</button>
            </div>
        )
    }

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
        if (currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <Fragment>
            { isDoorShown ? (doorDivs) : (divs) }
            {
                isModalShown ? <InfoModal close={hideModal} bloc={currentBloc+1} door={currentDoor} /> : null
            }

            <nav className='pagination-content mt-4'>
                <ul className="pagination pagination-bloc">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous"
                            onClick={prePage}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" href="#"
                                    onClick={() => changeCurrentPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next"
                            onClick={nextPage}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default BlocList;