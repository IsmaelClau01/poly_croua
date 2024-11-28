import React, { Fragment, useState, useRef, useEffect } from 'react';
import Room from '../../Image/Background/room.jpg'
import { Link } from 'react-router-dom';
import HouseBg from '../../Image/Background/apart.png';
import ConfirmModal from '././confirmModal';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MdPermIdentity } from 'react-icons/md';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io'
import { IoMailOutline } from 'react-icons/io5';

const Signup = (props) => {

    const manLabelRef = useRef(null)
    const [data, setData] = useState({
        'pseudo': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    })

    const user = auth.currentUser;

    const alovelaceDocumentRef = doc(db, 'users/alovelace')

    const navigate = useNavigate()
    const validSignup = async (e) => {
        e.preventDefault();
        // Ajouter des informations supplémentaires dans Firestore

        // try {
        //     // Vérifier si l'email existe déjà dans Firestore
        //     const usersRef = collection(db, 'users');
        //     const q = query(usersRef, where('email', '==', email));
        //     const querySnapshot = await getDocs(q);

        //     if (!querySnapshot.empty) {
        //       // L'email existe, création du compte
        //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        //       const user = userCredential.user;

        //       // Envoyer un email de vérification
        //       await sendEmailVerification(user);

        //       alert('message confirmation envoyé')

        //       navigate('/verify-user');
        //       //setMessage("Un lien de confirmation a été envoyé à votre adresse email. Veuillez vérifier votre email pour activer votre compte.");

        //       // Écouter la vérification de l'email
        //       auth.onAuthStateChanged(async (user) => {
        //         alert('ato1')
        //         if (user && user.emailVerified) {
        //             alert('ato2')
        //           // Mettre à jour le champ existAccount dans Firestore
        //           const userDoc = doc(db, 'users', querySnapshot.docs[0].id);
        //           await updateDoc(userDoc, { isAccountConfirm: true });
        //           alert("Votre compte a été activé avec succès.");
        //         }
        //       });

        //     } else {
        //       alert("Cet email n'existe pas dans notre base de données.");
        //     }
        //   } catch (error) {
        //     alert(`Erreur lors de l'inscription : ${error.message}`);
        //   }


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user
                // console.log(user);
                // navigate('/login')
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        showModal()
                    })
                // setDoc(doc(db, 'test', user.uid), {
                //     email: user.email,
                //     age: 45,
                //     phoneNumber: '033',
                //   });
            })
            .catch((error) => {
                setError(personalizeError(error.code))
            })
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

    const { pseudo, email, password, confirmPassword } = data

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    // const [selectedFieldOption, setSelectedFieldOption] = useState('')
    // const [selectedLevelOption, setSelectedLevelOption] = useState('')
    // const [selectedFormationOption, setSelectedFormationOption] = useState('')
    // const [isAcad, setIsAcad] = useState(true)

    // const selectedFieldChange = (e) => {
    //     setData({ ...data, field: e.target.value })
    //     setSelectedFieldOption(e.target.value)
    // }

    // const selectedLevelChange = (e) => {
    //     setData({ ...data, level: e.target.value })
    //     setSelectedLevelOption(e.target.value)
    // }

    // const selectedFormationChange = (e) => {
    //     if (e.target.value === 'pro') {
    //         setIsAcad(false)
    //     }
    //     else {
    //         setIsAcad(true)
    //     }

    //     setData({ ...data, formation: e.target.value })
    //     setSelectedFormationOption(e.target.value)
    // }

    // const [selectedSex, setSelectedSex] = useState('')

    // const btnSubmit = fname === '' || sname === '' || selectedSex === '' ||
    //     schoolIdentityNumber === '' || blocNumber === '' ||
    //     doorNumber === '' || email === '' || password === '' || password !== confirmPassword ?
    //     (<button className="btn btn-primary w-100 py-2 mt-2" type='subtmit' disabled>Confirmer</button>)
    //     : (<button className="btn btn-primary w-100 py-2 mt-2" type='subtmit'>Confirmer</button>)

    const btnSubmit = pseudo === '' || email === '' || password === '' || password !== confirmPassword ?
        (<button className="btn btn-orange-disabled w-50 py-2 mt-2" type='subtmit' disabled>Confirmer</button>)
        : (<button className="btn w-50 btn-orange py-2 mt-2" type='subtmit'>Confirmer</button>)

    // const sexSelect = (e) => {
    //     const selectedRadio = e.target.value
    //     const label = document.querySelector(`label[for="${e.target.id}"]`)
    //     setSelectedSex(label.textContent)
    //     setData({ ...data, sex: label.textContent })
    // }

    // const levelListAcad = ['L1', 'L2', 'L3', 'M1', 'M2']
    // const levelListPro = ['LP1', 'LP2', 'LP3', 'MP1', 'MP2']

    const [passwordType, setPasswordType] = useState('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState('password')
    const togglePasswordVisibility = () => {
        setPasswordType(prevType => (prevType) === 'password' ? 'text' : 'password')
    }
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(prevType => (prevType) === 'password' ? 'text' : 'password')
    }

    const [error, setError] = useState('')
    const errorMsg = error !== '' && <span>{error}</span>

    const [isModalShown, setIsModalShown] = useState(false)
    const hideModal = () => {
        setIsModalShown(false)
        navigate('/login')
    }
    const showModal = () => {
        setIsModalShown(true)
    }

    return (
        <Fragment>
            <div className='mt-0 signup-doc'>
                <div className='container mt-0 doc'>
                    <form onSubmit={validSignup}>
                        {
                            isModalShown ?
                                (
                                    <ConfirmModal close={hideModal}
                                        content='Veuillez ouvrir le lien envoyé dans votre e-mail..' />
                                ) : (
                                    null
                                )
                        }
                        <h1 className="h3 mb-5 text-center fw-normal">Formulaire d'inscription</h1>
                        <p className='text-center error-paragraph'>{errorMsg}</p>
                        <div className='row'>
                            <div className='col-12 mb-5 field-spacer'>
                                <MdPermIdentity className='icon-form' />
                                <input type="text" onChange={handleChange} className="w-100" id='pseudo' placeholder="Pseudo" />
                            </div>
                            <div className='col-12 mb-5 field-spacer'>
                                <IoMailOutline className='icon-form' />
                                <input type="email" onChange={handleChange} id='email' className="w-100" autoComplete='off' placeholder="Adresse e-mail" />
                            </div>
                            <div className='col-12 mb-5 field-spacer pwd-field-input'>
                                <IoMdLock className='icon-form' />
                                <input type={passwordType} onChange={handleChange} id='password' className='input-pwd' placeholder="Mot de passe" autoComplete='off' />
                                {
                                    passwordType === 'password' ?
                                        <FaEye className='input-hide-icon' onClick={togglePasswordVisibility} id='passwordIcon' />
                                        : <FaEyeSlash className='input-hide-icon' onClick={togglePasswordVisibility} id='passwordIcon' />
                                }
                            </div>
                            <div className='col-12 mb-5 field-spacer pwd-field-input'>
                                <IoMdLock className='icon-form' />
                                <input type={confirmPasswordType} onChange={handleChange} id='confirmPassword' className="input-pwd" placeholder="Confirmation" autoComplete='off' />
                                {
                                    confirmPasswordType === 'password' ?
                                        <FaEye className='input-hide-icon' onClick={toggleConfirmPasswordVisibility} id='confirmPasswordIcon' />
                                        : <FaEyeSlash className='input-hide-icon' onClick={toggleConfirmPasswordVisibility} id='confirmPasswordIcon' />
                                }
                            </div>
                            {/* <div className='col-6'>
                                    <p>
                                        <input type="text" onChange={handleChange} className="field-spacer w-100" id='sname' placeholder="Prénom" />
                                    </p>
                                </div>
                                <div className='col-6 mb-4'>
                                    <select onChange={selectedFieldChange} value={selectedFieldOption} style={{ backgroundColor: '' }} id='field' className="form-select" required="">
                                        <option value='tco'>Télécommunications</option>
                                        <option value='btp'>Bâtiment et Travaux Publics</option>
                                    </select>
                                </div>
                                <div className='col-2'>
                                    <select onChange={selectedLevelChange} value={selectedLevelOption} className="form-select" id="level" required="">
                                        {
                                            isAcad ?
                                                (levelListAcad.map((level, index) => (
                                                    <option key={index} value={level}>{level}</option>
                                                ))) :
                                                (levelListPro.map((level, index) => (
                                                    <option key={index} value={level}>{level}</option>
                                                ))
                                                )

                                        }
                                    </select>

                                </div>
                                <div className='col-4'>
                                    <select onChange={selectedFormationChange} value={selectedFormationOption} className="form-select" id="formation" required="">
                                        <option value='acad'>Académique</option>
                                        <option value='pro'>Professionnel</option>
                                    </select>
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

                        <div className='w-100 text-center'>{btnSubmit}</div>
                        <p className='mt-4 text-center little-text'>
                            Vous avez déjà un compte ? <Link to="/login" className='connect-link ps-2'> Connectez-vous </Link>
                        </p>
                        <p className="mt-5 mb-3 text-center text-body-secondary">© 2024</p>
                    </form>

                </div>
            </div>
        </Fragment>
    );
}

export default Signup;
