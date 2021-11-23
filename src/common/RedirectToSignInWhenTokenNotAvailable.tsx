import React from "react"
import { useHistory } from "react-router-dom"
import Cookies from "universal-cookie"
import { isSecurityEnabled } from "./Security"

export default function RedirectToSignInWhenTokenNotAvailable() {
    const cookies = new Cookies()
    const [JWTToken] = React.useState(cookies.get("jwt_token"))
    const history = useHistory()
    if(JWTToken === undefined && isSecurityEnabled) {
        history.push("/dashboard/signin")
    } 
}