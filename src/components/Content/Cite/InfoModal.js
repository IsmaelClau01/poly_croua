import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6'
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import ConfirmModal from '../../confirmModal/confirmModal';

const InfoModal = (props) => {

    const fieldList = ['TCO', 'BTP', 'EN', 'GE', 'IPE', 'IGAT', 'GGEO', 'GR', 'GMI', 'SIM', 'IMIN', 'MTO', 'GPCI']
    
    const fieldSort = fieldList.sort()
    const [selectedFieldOption, setSelectedFieldOption] = useState(fieldSort[0])
    const [selectedLevelOption, setSelectedLevelOption] = useState('L1')
    const [selectedFormationOption, setSelectedFormationOption] = useState('acad')
    const [optionLevel, setOptionLevel] = useState(['L1','L2','L3','M1','M2'])
    const [data, setData] = useState({
        fname: '',
        sname: '',
        field: '',
        level: selectedLevelOption,
        formation: selectedFormationOption,
        email: ''
    })

    const [isEmailExist, setIsEmailExist] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const checkEmailExists = async () => {
            if (email !== '') {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('email', '==', email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setIsEmailExist(true)
                } else {
                    setIsEmailExist(false)
                }
            }
        }
        checkEmailExists()
    }, [data.email])

    // useEffect(() => {
    //     const checkEFieldEmpty = async () => {
    //         if (data.fname === '' || data.sname === '') {

    //         } else {
    //             setIsEmailExist(false)
    //         }
    //     }
    //     checkEFieldEmpty()
    // }, [data.fname, data.sname])

    const fnameRef = useRef(null)
    const snameRef = useRef(null)
    const fieldRef = useRef(null)
    const emailRef = useRef(null)
    const validBtn = useRef(null)

    const { fname, sname, field, level, formation, email } = data
    const [btnValue, setBtnValue] = useState('Ajouter')

    const btnVerify = fname === '' || sname === '' || email === '' ? false : true

    const clearField = () => {
        fnameRef.current.value = ""
        snameRef.current.value = ""
        emailRef.current.value = ""
        setData({
            fname: '',
            sname: '',
            email: ''
        })
    }

    const [actionMessage, setActionMessage] = useState('')
    const validForm = async (e) => {
        const action = e.nativeEvent.submitter.id
        e.preventDefault()
        try {
            console.log(data, selectedFieldOption, selectedLevelOption, selectedFormationOption);
            switch (action) {
                case 'addBtn':
                    await addDoc(collection(db, 'users'), {
                        fname: data.fname,
                        fnameLowerCase: data.fname.toLowerCase(), 
                        sname: data.sname,
                        snameLowerCase: data.sname.toLowerCase(),
                        field: selectedFieldOption,
                        level: selectedLevelOption,
                        formation: selectedFormationOption,
                        email: data.email,
                        bloc: props.bloc,
                        door: props.door
                    })
                    setActionMessage('Ajout effectué avec succès..')
                    showModal()
                    clearField()
                    break;
                case 'modifyBtn':
                    try {
                        // Vérifier si l'email existe déjà dans Firestore
                        const usersRef = collection(db, 'users');
                        const q = query(usersRef, where('email', '==', email));
                        const querySnapshot = await getDocs(q);
                        if (!querySnapshot.empty) {
                            
                            const userDocRef = doc(db, 'users', querySnapshot.docs[0].id)
                            await updateDoc(userDocRef, {
                                fname: data.fname,
                                fnameLowerCase: data.fname.toLowerCase(),
                                sname: data.sname,
                                snameLowerCase: data.sname.toLowerCase(),
                                field: selectedFieldOption,
                                level: selectedLevelOption,
                                formation: selectedFormationOption
                            })
                            setActionMessage('Modification effectuée avec succès..')
                            showModal()
                            clearField()
                        } else {
                            alert("Cet email n'existe pas dans notre base de données.");
                        }
                    } catch (error) {
                        alert(`Erreur lors de la modification : ${error.message}`);
                    }
                    break;
                case 'deleteBtn':
                    if (window.confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                        try {
                            const q = query(collection(db, 'users'), where('email', '==', email))
                            const querySnapshot = await getDocs(q)

                            if (!querySnapshot.empty) {
                                const userDocRef = doc(db, 'users', querySnapshot.docs[0].id)
                                await deleteDoc(userDocRef)
                                setActionMessage('Cette information a bien été supprimée avec succès..')
                                showModal()
                                clearField()
                            }
                        }
                        catch (error) {
                            console.error('Erreur lors de la suppression : ', error);
                        }
                    }
                    break;
                default:
                    break;
            }


        } catch (error) {

        }
        updateListTable()
    }

    const personalizeError = (errorMsg) => {
        let personlizeMsg
        switch (errorMsg) {
            case 'auth/email-already-in-use':
                personlizeMsg = "L'adresse e-mail est déja utilisée par un autre compte";
                break;
            case 'auth/invalid-email':
                personlizeMsg = "L'adresse e-mail est mal formatée.";
                break;
            case 'auth/weak-password':
                personlizeMsg = "Utilisez au moins 6 caractères pour le mot de passe";
                break;
            case 'auth/operation-not-allowed':
                personlizeMsg = "L'inscription par e-mail et mot de passe est désactivée.";
                break;
            case 'auth/network-request-failed':
                personlizeMsg = "Veuillez vérifier votre connexion et réessayer.";
                break;
            case 'auth/too-many-requests':
                personlizeMsg = "Nous avons détecté une activité inhabituelle. Veuillez réessayer plus tard.";
                break;
            case 'auth/internal-error':
                personlizeMsg = "Une erreur interne est survenue. Veuillez réessayer.";
                break;
            default:
                personlizeMsg = "Une erreur inconnue est survenue. Veuillez réessayer.";
                break;
        }
        return personlizeMsg
    }

    const handleChange = async (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const [error, setError] = useState('')
    const errorMsg = error !== '' && <span>{error}</span>

    const selectedFieldChange = (e) => {
        setData({ ...data, field: e.target.value })
        setSelectedFieldOption(e.target.value)
    }

    const selectRow = (e) => {
        const clickedRow = e.currentTarget
        fnameRef.current.value = clickedRow.children[0].innerText
        snameRef.current.value = clickedRow.children[1].innerText
        setSelectedFieldOption(clickedRow.children[2].innerText)
        emailRef.current.value = clickedRow.children[4].innerText
        setData({
            fname: fnameRef.current.value,
            sname: snameRef.current.value,
            field: clickedRow.children[2].innerText,
            email: clickedRow.children[4].innerText
        })
    }

    const [isModalShown, setIsModalShown] = useState(false)

    const hideModal = () => {
        setIsModalShown(false)
    }
    const showModal = () => {
        setIsModalShown(true)
    }

    useEffect(() => {
        updateListTable()
    }, [])

    const updateListTable = async (e) => {
        // console.log('first');
        try {
            const q = query(collection(db, 'users'), where('door', '==', props.door))
            const querySnapshot = await getDocs(q)
            const userList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(userList)
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs : ', error);
        }
    }

    
    // const [isAcad, setIsAcad] = useState(true)

    const selectedLevelChange = (e) => {
        setSelectedLevelOption(e.target.value)
        setData({ ...data, level: e.target.value })
    }

    const selectedFormationChange = (e) => {
       const value = e.target.value
       setSelectedFormationOption(value)

       if(value === 'acad') {
         setOptionLevel(['L1','L2','L3','M1','M2'])
         setSelectedLevelOption('L1')
       }
       else if (value === 'pro') {
         setOptionLevel(['LP1','LP2','LP3','MP1','MP2'])
         setSelectedLevelOption('LP1')
       }

        setData({ ...data, formation: e.target.value })
    }


    return (
        <div className='modal'>
            <div className='row' style={{ color: 'black' }}>
                <div className='col-5 student-crud'>
                    <div className='mt-0 '>
                        <div className='container mt-0 doc'>
                            <form onSubmit={validForm} className='student-crud-form'>
                                {
                                    isModalShown ? (<ConfirmModal close={hideModal} content={actionMessage} />) : (null)
                                }
                                <h1 className="h3 mb-5">Formulaire</h1>
                                <p className='error-paragraph'>{errorMsg}</p>
                                <div className='row'>
                                    <div className='col-12 mb-4'>
                                        <input ref={fnameRef} type="text" value={fname} onChange={handleChange} className="input-crud w-100" id='fname' placeholder="Nom" />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <input ref={snameRef} type="text" value={sname} onChange={handleChange} className="input-crud w-100" id='sname' placeholder="Prénoms" />
                                    </div>
                                    <div className='col-4 mb-4'>
                                        <select ref={fieldRef} onChange={selectedFieldChange} value={selectedFieldOption} style={{ backgroundColor: '' }} id='field' className="form-select" required="">
                                            {
                                                fieldSort.map((field) => (
                                                    <option value={field} key={field}>{field}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className='col-3'>
                                        <select onChange={selectedLevelChange} value={selectedLevelOption} className="form-select" id="level" required="">
                                            {
                                                optionLevel.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className='col-5'>
                                        <select onChange={selectedFormationChange} value={selectedFormationOption} className="form-select" id="formation" required="">
                                            <option value='acad'>Académique</option>
                                            <option value='pro'>Professionnel</option>
                                        </select>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <input ref={emailRef} type="email" value={email} onChange={handleChange} id='email' className="input-crud w-100" autoComplete='off' placeholder="Adresse e-mail" />
                                    </div>

                                    {/* <div className='col-6'>
                                    <p>
                                        <input type="text" onChange={handleChange} className="field-spacer w-100" id='sname' placeholder="Prénom" />
                                    </p>
                                </div>
                                
                                <div className='col-3'>
                                    <div className="form-check signup-field-color">
                                        <input id="man" onChange={sexSelect} name="sex" type="radio" className="form-check-input" required="" />
                                        <label ref={manLabelRef} className="form-check-label" htmlFor="man">Homme</label>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="form-check signup-field-color">
                                        <input id="woman" onChange={sexSelect} name="sex" type="radio" className="form-check-input" required="" />
                                        <label className="form-check-label" htmlFor="woman">Femme</label>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <p className='mb-4'>
                                        <input type="text" onChange={handleChange} id='schoolIdentityNumber' className="field-spacer w-100" placeholder="Numéro d'inscription" />
                                    </p>
                                </div>
                                <div className='col-6'>
                                    <p className='mb-4'>
                                        <input type="text" onChange={handleChange} id='blocNumber' className="field-spacer w-100" placeholder="Numéro Bloc" />
                                    </p>
                                </div>
                                <div className='col-6'>
                                    <p className='mb-4'>
                                        <input type="text" onChange={handleChange} id='doorNumber' className="field-spacer w-100" placeholder="Numéro Porte" />
                                    </p>
                                </div> */}

                                </div>

                                {
                                    isEmailExist ? (
                                        <div>
                                            <div className='add-clear-line'>
                                                <button className="btn btn-primary py-2 mt-2" type='subtmit' disabled>Ajouter</button>
                                                <button onClick={clearField} className="btn btn-primary py-2 mt-2" id='clearBtn' type='button' disabled={btnVerify ? ('') : (true)}>Effacer</button>
                                            </div>
                                            <div className='add-clear-line'>
                                                <button className="btn btn-primary py-2 mt-2" type='subtmit' id='modifyBtn' disabled={btnVerify ? ('') : (true)}>Modifier</button>
                                                <button className="btn btn-primary py-2 mt-2" type='subtmit' id='deleteBtn' disabled={btnVerify ? ('') : (true)}>Supprimer</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className='add-clear-line'>
                                                <button ref={validBtn} className="btn btn-primary py-2 mt-2" id='addBtn' type='subtmit'>Ajouter</button>
                                                <button ref={validBtn} onClick={clearField} className="btn btn-primary py-2 mt-2" type='button' id='clearBtn'>Effacer</button>
                                            </div>
                                            <div className='add-clear-line mt-2'>
                                                <button ref={validBtn} className="btn btn-primary py-2 mt-2" type='subtmit' disabled>Modifier</button>
                                                <button ref={validBtn} className="btn btn-primary py-2 mt-2" type='subtmit' disabled>Supprimer</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </form>

                        </div>
                    </div>
                </div>
                <div className='col pt-2 info-student-container'>
                    <div className='close-icon-div'>
                        <FaXmark className='close-icon' onClick={props.close} />
                    </div>
                    <div className='table-container'>
                        <p className='list-title pb-4' style={{ color: 'blue' }}>Liste des étudiants dans le bloc {props.bloc} / Porte {props.door}</p>
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénoms</th>
                                    <th scope="col">Mention</th>
                                    <th scope="col">Niveau</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr className="row-table" onClick={selectRow}>
                                    <td className='rowCol1'>RALAISEHENO</td>
                                    <td className='rowCol2'>Claudio Ismaël</td>
                                    <td className='rowCol3'>TCO</td>
                                    <td className='rowCol4'>ismael02clau@gmail.com</td>
                                </tr > */}
                                {
                                    users.map((user) => (
                                        <tr key={user.id} className="row-table" onClick={selectRow}>
                                            <td className='rowCol1'>{user.fname}</td>
                                            <td className='rowCol1'>{user.sname}</td>
                                            <td className='rowCol1'>{user.field}</td>
                                            <td className='rowCol1'>{user.level}</td>
                                            <td className='rowCol1'>{user.email}</td>
                                        </tr>
                                    ))
                                }
                                {/* <tr className="row-table" onClick={selectRow}>
                                    <td>Name1</td>
                                    <td>Firstname1</td>
                                    <td>BTP</td>
                                    <td>e-mail1</td>
                                </tr>
                                <tr className="row-table" onClick={selectRow}>
                                    <td>Name2</td>
                                    <td>Firstname2</td>
                                    <td>BTP</td>
                                    <td>e-mail2</td>
                                </tr>
                                <tr className="row-table" onClick={selectRow}>
                                    <td>Name3</td>
                                    <td>Firstname3</td>
                                    <td>TCO</td>
                                    <td>e-mail3</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;
