import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import {AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { isSecurityEnabled } from "../../../common/Security";
import { useURIAddition } from "./../Clients.helpers";

interface ClientRedirect {
    clientId: string
}

export const NewRedirection: FC<ClientRedirect> = ({clientId}: ClientRedirect) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const addURI = useURIAddition()
    
    const cookies = new Cookies()
    const history = useHistory()

    const [URIToAdd, setURIToAdd] = useState("")


    const handleAddURI = () => { 
        addURI(clientId, URIToAdd)
        .catch((error)=> {
            console.log(error);
            cookies.remove("jwt_token")
            if(isSecurityEnabled) {
                history.push("/dashboard/signin")
            }
        })
        .finally(() => {
                window.location.reload()
            }
        )
    }

    return ( 
        <Box paddingBottom="40px">
         <Button isDisabled={clientId===undefined} onClick={onOpen} leftIcon={<AiOutlinePlus/>} colorScheme="green" marginRight="20px" float="right">New</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add redirection to client</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
            
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input onChange={e=>setURIToAdd(e.currentTarget.value)} placeholder="uri" />
                </FormControl>

                </ModalBody>

                <ModalFooter>
                <Button onClick={handleAddURI} isDisabled={clientId==="" || URIToAdd === ""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

