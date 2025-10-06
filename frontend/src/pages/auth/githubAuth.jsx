import { Context } from "@/components/modules/context"
import { useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"


export default function GithubAuth() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { setUserLogin, setIsLoggedIn } = useContext(Context)

  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    const params = new URLSearchParams(search)
    const token = params.get("token")
    const message = params.get("message")

    if (token) {
      
      localStorage.setItem("token", token)

      fetch(`${BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            
            localStorage.setItem("user", JSON.stringify(data.user))

            setUserLogin(data.user)
            setIsLoggedIn(true)

            Swal.fire({
              title: "Success!",
              text: message || "Login with GitHub successful!",
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              navigate("/profile")
            })
          } else {
            throw new Error("No user returned from backend")
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Error!",
            text: "Could not fetch user data.",
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/signin")
          })
        })
    } else {
      Swal.fire({
        title: "Error!",
        text: "Login with GitHub failed.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/signin")
      })
    }
  }, [search, navigate, BACKEND_URL, setUserLogin, setIsLoggedIn])

  return <p>Logging you in with GitHub...</p>
}

