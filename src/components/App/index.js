import React, { useEffect, useState } from 'react';
import '../../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Landing from '../Landing';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import Login from '../Login/Login';
import Home from '../Content/Home/';
import Cite from '../Content/Cite/index';
import Pedag from '../Content/Pedag';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import VerifyUser from '../Signup/EmailVerification';
import { auth } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const database = getDatabase(cong);
  //   const collectionRef = ref(database, "your_collection")

  //   const fetchData = () => {
  //     onValue(collectionRef, (snapshot) => {
  //       const dataItem = snapshot.val();

  //       if(dataItem) {
  //         const displayItem = Object.values(dataItem);
  //         setData(displayItem);
  //       }
  //     });
  //   };

  //   fetchData();
  // }, []);

  const [user, setUser] = useState(null)
  const [isFetch, setIsFetch] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
        setIsFetch(false);
        return;
      }
      setUser(null);
      setIsFetch(false)
    });
    return () => unsubscribe();
  }, [])

    return (
      <UserProvider>
      <div className='App'>
        <BrowserRouter>
        <Routes>
          <Route index element={<Landing />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="login" element={<Login user={user}/>}/>
          <Route path="home" element={<Home />}/>
          <Route path="cite" element={<Cite />}/>
          <Route path="pedagogique" element={<Pedag />}/>
          <Route path="verify-user" element={VerifyUser} />
          {/* <Route path="about" element={<About />}/>
          <Route path="contact" element={<Contact />}/> */}
          <Route path="*" element={<ErrorPage />}/>
        </Routes>

        {/* <Footer /> */} 
         
      </BrowserRouter>
      </div>
      </UserProvider>
    );
  
}

export default App;