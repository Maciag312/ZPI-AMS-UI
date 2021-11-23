import { Button } from "@chakra-ui/button"
import React from "react"
import { useHistory } from "react-router-dom"
import Cookies from "universal-cookie"
import { isSecurityEnabled } from "../common/Security"
import { BiLogOut } from "react-icons/bi";

export default function SignOutButton() {
    const cookies = new Cookies()
    const [JWTToken] = React.useState(cookies.get("jwt_token"))
    const history = useHistory()

    const signOut = () => {
        cookies.remove('jwt_token', { path: '/dashboard', domain: "localhost" });
        cookies.remove('jwt_token', { path: '/', domain: "localhost" });
        if(isSecurityEnabled) {
            history.push("/dashboard/signin")
        }
    }
  
    if(JWTToken !== undefined) {
        return <Button leftIcon={<BiLogOut/>} onClick={signOut} color="white" backgroundColor="#7EB6AB" >Sign out</Button>
    } else {
        return <Button leftIcon={<BiLogOut/>} onClick={signOut} color="white" backgroundColor="#7EB6AB" >Sign out</Button>
    }
}