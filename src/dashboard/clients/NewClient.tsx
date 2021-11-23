import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {AiOutlinePlus } from "react-icons/ai";
import { useClientAddition } from "./Clients.helpers";

export default function NewClient() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [clientId, setClientId] = useState("")
    const addClient = useClientAddition()

    const handleSubmit = () => { 
        let client = {id: clientId, availableRedirectUris: []}
        addClient(client)
        window.location.reload()
    }

    return ( 
        <Box>
         <Button onClick={onOpen} leftIcon={<AiOutlinePlus/>} colorScheme="green" marginRight="20px" float="right">New Client</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new client</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Client</FormLabel>
                    <Input onChange={e=>setClientId(e.currentTarget.value)} placeholder="client id" />
                </FormControl>

                </ModalBody>

                <ModalFooter>
                <Button onClick={handleSubmit} isDisabled={clientId===""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

