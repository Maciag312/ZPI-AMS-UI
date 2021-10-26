import { Button } from "@chakra-ui/button"
import React from "react"
import { useHistory } from "react-router-dom"
import Cookies from "universal-cookie"

export default function SignOutButton() {
    const cookies = new Cookies()
    const [JWTToken] = React.useState(cookies.get("jwt_token"))
    const history = useHistory()

    const signOut = () => {
        cookies.remove('jwt_token', { path: '/dashboard', domain: "localhost" });
        cookies.remove('jwt_token', { path: '/', domain: "localhost" });
        history.push("/dashboard/signin")
    }
  
    if(JWTToken !== undefined) {
        return <Button onClick={signOut} colorScheme="blue">Sign out</Button>
    } else {
        return <></>
    }
}