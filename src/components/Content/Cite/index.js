import React, { useState, useContext } from 'react';
import Header from '../Header/index';
import BlocResult from './BlocResult';
import InfoModal from './InfoModal';
import { UserContext } from '../../App/UserContext';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { FaSearch } from 'react-icons/fa';
import { TbFilterSearch } from 'react-icons/tb';
import { FaListCheck } from 'react-icons/fa6';

const Cite = () => {

    //const blocListRef = useRef(null)

    // const test = setBlocListHeight(blocListRef.current)


    // const view = () => {
    //     setBlocListHeight(blocListRef.current.clientHeight)
    //     console.log(blocListHeight);
    // }

    const { isAdmin } = useContext(UserContext);

    const [blocResult, setBlocResult] = useState(true)
    const [isBlocRefresh, setIsBlocRefresh] = useState(false)

    const toggleBlocResult = () => {
        setBlocResult(true)
        setBlocListKey(prevKey => prevKey + 1)
    }

    const [blocListkey, setBlocListKey] = useState(0)
    const handleRemount = () => {

    }

    const [isListSearchShown, setIsListSearchShown] = useState(false)
    const toggleSearchList = () => {
        isListSearchShown ? (
            setIsListSearchShown(false)
        ) : (
            setIsListSearchShown(true)
        )
    }

    const [searchType, setSearchType] = useState('Entrez le nom')
    const [searchTypeFormat, setSearchTypeFormat] = useState('name')

    const nameSelected = () => {
        setSearchType('Entrez le nom ou prénom')
        setIsListSearchShown(false)
        setSearchTypeFormat('name')
    }

    const levelSelected = () => {
        setSearchType('Exemple: L1')
        setIsListSearchShown(false)
        setSearchTypeFormat('level')
    }

    const [resultList, setResultList] = useState([])

    const [searchResult, setSearchResult] = useState(false)

    const fetchData = async (e) => {
        if (e.target.value === '')
            setSearchResult(false)
        else
            setSearchResult(true)
        
        if (searchTypeFormat === 'level') {
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);

            const filteredResults = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user =>
                    user.level.toLowerCase().includes(e.target.value.toLowerCase())
                );
            setResultList(filteredResults)
        }
        else {
            // const q = query(collection(db, 'users'), where('bloc', '==', 26))
            // const querySnapshot = await getDocs(q)
            // const userList = querySnapshot.docs.map(doc => ({
            //     id: doc.id,
            //     ...doc.data()
            // }))
            // console.log(userList);
            try {

                // const usersCollection = collection(db, 'users');

                // const nomQuery = query(
                //     usersCollection,
                //     where('fnameLowerCase', '>=', e.target.value.toLowerCase()),
                //     where('fnameLowerCase', '<=', e.target.value.toLowerCase() + '\uf8ff')
                // );

                // const prenomsQuery = query(
                //     usersCollection,
                //     where('snameLowerCase', '>=', e.target.value.toLowerCase()),
                //     where('snameLowerCase', '<=', e.target.value.toLowerCase() + '\uf8ff')
                // );

                // const [nomQuerySnapshot, prenomsQuerySnapshot] = await Promise.all([
                //     getDocs(nomQuery),
                //     getDocs(prenomsQuery),
                // ]);

                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollection);

                const filteredResults = querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(user =>
                        user.fname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        user.sname.toLowerCase().includes(e.target.value.toLowerCase())
                    );

                setResultList(filteredResults)

            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs: ", error);
            }

        }

    }

    const setActive = (e) => {
        console.log(e.target)
    }

    const showModal = () => {
        setIsModalShown(true)
    }

    const hideModal = () => {
        setIsModalShown(false)
    }

    const [isModalShown, setIsModalShown] = useState(false)
    const [currentUserBloc, setCurrentUserBloc] = useState('')
    const [currentUserDoor, setCurrentUserDoor] = useState('')
    const showStudentInfo = (bloc, door) => {
        setCurrentUserBloc(bloc)
        setCurrentUserDoor(door)
        setIsModalShown(true)
    }

    const hideSearchResult = () => {
        setSearchResult(false)
    }

    return (
        <div className='page-light cite-doc'>
            <Header active="Cite" />
            <div className='mt-5'>
                <div className='row row-edit justify-content-evenly'>
                    <div className='col-5 cite-bloc-right'>

                        <div className='row cite-bloc-input-container pt-4 mx-auto'>
                            <p className='text-center'>
                                Texte pour introduire la recherche...
                            </p>

                            <div className='cite-input-search-container mt-3'>
                                <input onChange={fetchData} onBlur={hideSearchResult} className="cite-input-search mb-4" type="text" placeholder={searchType} />
                                {
                                    searchResult ? (
                                        <div className='row search-result-bloc'>
                                            {resultList.map((user, index) => (
                                                <div className='row searchResult' onMouseOver={setActive} onClick={() => showStudentInfo(user.bloc, user.door)} key={index}>
                                                    <div className='col-9'>{user.fname} {user.sname}</div>
                                                    <div className='col-3'>B{user.bloc}/P{user.door}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (null)
                                }
                                <FaSearch className='input-search-icon' />
                                <div className='searchType'>
                                    <TbFilterSearch onClick={toggleSearchList} className='search-filter-icon' />
                                    {
                                        isListSearchShown ? (
                                            <div className='listChoice'>
                                                <ul>
                                                    <li onClick={nameSelected}>Nom et prénoms</li>
                                                    <li onClick={levelSelected}>Année d'étude</li>
                                                </ul>
                                            </div>
                                        ) : (null)
                                    }
                                </div>
                            </div>
                        </div>

                        <BlocResult blocResultState={blocResult} key={blocListkey} reset={toggleBlocResult} />

                        {
                            isModalShown ? (
                                <InfoModal close={hideModal} bloc={currentUserBloc} door={currentUserDoor} />
                            ) :
                                (null)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cite;