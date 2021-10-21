import React from "react"
import RedirectToSignInWhenTokenNotAvailable from "../common/RedirectToSignInWhenTokenNotAvailable";


import "./style.css";
import NavigationBar from "../common/NavigationBar";
import ClientConfiguration from "./ClientConfiguration";



export default function Dashboard() {
    RedirectToSignInWhenTokenNotAvailable();

   
    return (
    <div>
        <NavigationBar></NavigationBar>
        <ClientConfiguration></ClientConfiguration>
    </div>
    )

}