import { createContext, useState } from "react";



export const AuthContext = createContext({
    token: null,
    setToken: () => {}
})

export const AuthContextProvider = ({children}) => {

    const [token, _setToken] = useState(localStorage.getItem('Token'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('Token', token)
        } else {
            localStorage.removeItem('Token')
        }
    }

    return(
      <AuthContext.Provider value={
        {
            token,
            setToken
        }
      }>{children}</AuthContext.Provider>  
    ) 
}