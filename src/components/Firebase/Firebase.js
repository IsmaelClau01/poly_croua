import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {

    apiKey: "AIzaSyAv77-jqfKAK4O9H_EffB-B1ZzpOKDttgU",
  
    authDomain: "e-croua-a1b69.firebaseapp.com",
  
    projectId: "e-croua-a1b69",
  
    storageBucket: "e-croua-a1b69.appspot.com",
  
    messagingSenderId: "910689201090",
  
    appId: "1:910689201090:web:e8ce526327bb0b76ec445b",
  
  };
  

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app);
export const functions = getFunctions(app);

