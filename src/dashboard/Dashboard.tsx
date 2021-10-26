import RedirectToSignInWhenTokenNotAvailable from "../common/RedirectToSignInWhenTokenNotAvailable";


import "./style.css";
import NavigationBar from "../components/NavigationBar";
import ClientConfiguration from "./ClientConfiguration";
import SideBar from "../components/SideBar";



export default function Dashboard() {
    RedirectToSignInWhenTokenNotAvailable();

   
    return (
    <div>
        <NavigationBar/>
        <ClientConfiguration></ClientConfiguration>
    </div>
    )

}