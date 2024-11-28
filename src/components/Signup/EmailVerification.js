import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Firebase';
import { applyActionCode } from 'firebase/auth';

const VerifyUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(async () => {
          console.log("Email vérifié avec succès");
          navigate("/login"); // Rediriger vers la page de login
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification de l'email:", error);
        });
    }
    // const checkVerification = async () => {
    //   const user = auth.currentUser;
    //   if (user) {
    //     await user.reload(); // Rafraîchir l'état de l'utilisateur
        
    //     if (user.emailVerified) {
    //       // Mettre à jour le champ existAccount dans Firestore
    //       await db.collection('users').doc(user.email).update({
    //         isAccountExist: true,
    //       });
    //       console.log('Compte vérifié et mis à jour.');

    //       // Rediriger vers la page d'accueil ou une autre page
    //       navigate('/home');
    //     } else {
    //       console.log('L\'utilisateur n\'est pas encore vérifié.');
    //     }
    //   } else {
    //     // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    //     navigate('/login');
    //   }
    // };

    // checkVerification();
  }, []);

  return <div>Vérification de votre compte en cours...</div>;
};

export default VerifyUser;
