import SignOutButton from "../common/SignOutButton"

import "./../dashboard/style.css";

export default function NavigationBar() {
   
    return (
        <div style={{width: "100%", backgroundColor: "#F1F1F1", height: "60px"}}>
            <div style={{float: "right", padding: "10px"}}>
                <SignOutButton></SignOutButton>
            </div>
        </div>
        )

}