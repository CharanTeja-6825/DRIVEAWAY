import React from 'react'
import { useContext, createContext, useState } from 'react'

const AuthProvider = createContext();

export default function AuthContext({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")))
    return (
    <AuthProvider.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthProvider.Provider>
    )
}

export const useAuth = () => useContext(AuthProvider);