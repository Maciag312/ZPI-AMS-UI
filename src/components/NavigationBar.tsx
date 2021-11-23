import SignOutButton from "./SignOutButton"

import "./../common/style.css";
import { Box } from "@chakra-ui/react";

export default function NavigationBar() {
   
    return (
        <Box>
        <Box style={{width: "100%", backgroundColor: "#FEFCFC", height: "90px"}}>
            <Box float="right" padding="22px">
                <SignOutButton></SignOutButton>
            </Box>
        </Box>
            <hr style={{borderTopWidth: "2px", borderColor: "#E8E8E8"}}></hr>
        </Box>)
}