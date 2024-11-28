import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function ProtectedRoute({children}) {
    const auth = getAuth()
    const user = auth.currentUser

    return user ? children : <Navigate to='/' />
}