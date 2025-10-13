import { useState, useEffect } from 'react'
import { Context } from './context'

export const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Al primo render recupera user e token da localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      setUserLogin(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
  }, [setUserLogin])

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  )
}
