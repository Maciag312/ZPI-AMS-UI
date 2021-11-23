import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {AiOutlineUserAdd } from "react-icons/ai";
import { useAddUser } from "./Users.helpers";


export default function NewUser() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const addUser = useAddUser()

    const handleSubmit = () => { 
        addUser(username, email).finally(()=>{
            window.location.reload()
        })
    }
  
    return ( 
        <Box>
         <Button onClick={onOpen} leftIcon={<AiOutlineUserAdd/>} colorScheme="green" marginRight="20px" float="right">New</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new user</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input onChange={e=>setUsername(e.currentTarget.value)} placeholder="Username" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={e=>setEmail(e.currentTarget.value)} placeholder="Email" />
                </FormControl>
                </ModalBody>

                <ModalFooter>
                <Button onClick={handleSubmit} isDisabled={username==="" || email ===""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

