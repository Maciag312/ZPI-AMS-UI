import React from "react"
import { useHistory } from "react-router-dom"
import Cookies from "universal-cookie"
import { CLIENTS } from "../Routes"

export default function RedirectToDashboardWhenTokenAvailable() {
    const cookies = new Cookies()
    const [JWTToken] = React.useState(cookies.get("jwt_token"))
  
    const history = useHistory()
    if(JWTToken !== undefined) {
        history.push(CLIENTS)
    }
}