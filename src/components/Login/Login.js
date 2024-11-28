import React, { Fragment, useState, useContext } from 'react';
import HouseBg from '../../Image/Background/apart.png';
import { UserContext } from '../App/UserContext';
import { auth, db } from '../Firebase/Firebase';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io'
import { IoMailOutline } from 'react-icons/io5';
import { collection, where, query, getDocs } from 'firebase/firestore';

const Login = (user) => {

    const { setIsAdmin } = useContext(UserContext);

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = data
    const navigate = useNavigate()

    const validLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                const user = userCredential.user
                // console.log(user);
                // console.log(userCredential);
                // console.log("ok");
                // navigate('/home');
                
                if (user.emailVerified) {
                    const q = query(collection(db, 'admin'), where('email', '==', email))
                    const querySnapshot = await getDocs(q)
                    const userList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    // console.log(userList[0].isAdmin)
                    // if (userList[0].isAdmin) {  
                        
                        // const userData = userDoc.data();

                        // // Vérifier si l'utilisateur est un administrateur
                        // if (userData.isAdmin) {
                        //     // Rediriger vers le composant admin
                            navigate('/cite');
                            // setIsAdmin(true)
                        // } else {
                        //     // Rediriger vers le composant utilisateur
                        //     navigate('/cite');
                        // }
                    // }
                    // else{
                    //     navigate('/cite');
                    // }
                } else
                    setError('Veuillez confirmez votre e-mail..')

            })
            .catch((error) => {
                setError(personalizeError(error.code))
            })
        // try {
        //     await setPersistence(auth, browserLocalPersistence);
        //     await signInWithEmailAndPassword(auth, email, password)
        //         .then((userCredential) => {
        //             const user = userCredential.user
        //             console.log(user);
        //             console.log(userCredential);
        //             console.log("ok");
        //             navigate('/home');
        //         })
        //         .catch((error) => {
        //             const errorCode = error.code;
        //             const errorMessage = error.Message;
        //             console.log('pas ok');
        //         })
    }

    const personalizeError = (errorMsg) => {
        let personlizeMsg
        switch (errorMsg.code) {
            case 'auth/invalid-email':
              personlizeMsg = 'L\'adresse email est invalide.';
              break;
            case 'auth/user-disabled':
              personlizeMsg = 'Ce compte a été désactivé.';
              break;
            case 'auth/user-not-found':
              personlizeMsg = 'Aucun utilisateur trouvé avec cette adresse email.';
              break;
            case 'auth/wrong-password':
              personlizeMsg = 'Le mot de passe est incorrect.';
              break;
            default:
              personlizeMsg = 'Une erreur est survenue. Veuillez réessayer.';
              break;
        }
        return personlizeMsg
    }

    const updateInput = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const [passwordType, setPasswordType] = useState('password')
    const togglePasswordVisibility = () => {
        setPasswordType(prevType => (prevType) === 'password' ? 'text' : 'password')
    }

    // if(user) {
    //     return <Navigate to='/login'></Navigate>
    // }

    const [error, setError] = useState('')
    const errorMsg = error !== '' && <span>{error}</span>

    return (
        <Fragment>
            <div className='login-doc mt-0'>

            </div>
            <div className='container mt-0'>
                <div className='row spacer-top'></div>
                <div className='row'>
                    <div className='col-8'>
                        <div className='w-50'>
                            <main className="form-signin w-100 m-auto">
                                <form onSubmit={validLogin}>
                                    <h1 className="h3 mb-5 text-center fw-normal">Identifiez-vous</h1>
                                    <p className='text-center error-paragraph'>{errorMsg}</p>

                                    <div className='col-12 mb-5 field-spacer field-spacer-login'>
                                        <IoMailOutline className='icon-form' />
                                        <input type="email" onChange={updateInput} id='email' className="w-100" autoComplete='off' placeholder="Adresse e-mail" />
                                    </div>

                                    <div className='col-12 mb-5 field-spacer pwd-field-input pwd-field-input-login'>
                                        <IoMdLock className='icon-form' />
                                        <input type={passwordType} onChange={updateInput} id='password' className='input-pwd' placeholder="Mot de passe" autoComplete='off' />
                                        {
                                            passwordType === 'password' ?
                                                <FaEye className='input-hide-icon' onClick={togglePasswordVisibility} id='passwordIcon' />
                                                : <FaEyeSlash className='input-hide-icon' onClick={togglePasswordVisibility} id='passwordIcon' />
                                        }
                                    </div>

                                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Se connecter</button>
                                    <p className='mt-4 text-center little-text'>
                                        Vous n'avez pas encore un compte ? <Link to="/signup" className='connect-link ps-2'> Inscrivez-vous </Link>
                                    </p>
                                    <p className="mt-5 mb-3 text-center text-body-secondary">© 2024</p>
                                </form>
                            </main>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
