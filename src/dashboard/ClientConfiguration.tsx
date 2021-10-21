import { Box } from "@chakra-ui/layout"
import RedirectToSignInWhenTokenNotAvailable from "../common/RedirectToSignInWhenTokenNotAvailable";
import { Button, Textarea } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

import "./style.css";



export default function ClientConfiguration() {
    RedirectToSignInWhenTokenNotAvailable();

   
    return (
    <div>
        <Box className="AuthorizationWrapper">
            <Box className="AuthorizationPageBox" rounded="lg">
                <Box className="AuthorizationPageBoxContent"></Box>
                    <Text fontSize="3xl">Client configuration</Text>
                    <Input style={{width: "400px", margin: "15px auto 10px auto", backgroundColor: "white"}} placeholder = "client id"></Input>
                    <Textarea placeholder = "Please set redirection uris here:" style={{width: "400px", margin: "0px auto 10px auto", backgroundColor: "white"}}></Textarea>
                    <br></br>
                    <Button style={{margin: "10px auto 20px auto"}} colorScheme="green">Add</Button>
                </Box>
            </Box> 
    </div>
    )

}