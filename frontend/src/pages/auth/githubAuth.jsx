import { Context } from "@/components/modules/context"
import { useEffect, useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"


export default function GithubAuth() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { setUserLogin, setIsLoggedIn } = useContext(Context)
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND

  useEffect(() => {
    setLoading(true);
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
              confirmButtonText: "Profile",
            }).then(() => {
              setLoading(false);
              navigate("/profile", { replace: true })
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
            setLoading(false);
            navigate("/signin", { replace: true })
          })
        })
    } else {
      Swal.fire({
        title: "Error!",
        text: "Login with GitHub failed.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        setLoading(false);
        navigate("/signin", { replace: true })
      })
    }
  }, [search, navigate, BACKEND_URL, setUserLogin, setIsLoggedIn])

  return <p>Logging you in with GitHub...</p>
}

