import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase/Firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setIsAdmin(userData.isAdmin);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
