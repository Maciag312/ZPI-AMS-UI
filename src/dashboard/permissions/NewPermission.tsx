import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {AiOutlinePlus } from "react-icons/ai";

import { useAddPermission } from "./Permissions.helpers";

export default function NewPermission() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [permission, setPermission] = useState("")
    const addPermission = useAddPermission()

    const handleSubmit = () => { 
        addPermission(permission)
        window.location.reload()
    }

    return ( 
        <Box>
         <Button onClick={onOpen} leftIcon={<AiOutlinePlus/>} colorScheme="green" marginRight="20px" float="right">New Permission</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new permission</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Permission</FormLabel>
                    <Input onChange={e=>setPermission(e.currentTarget.value)} placeholder="permission name" />
                </FormControl>

                </ModalBody>

                <ModalFooter>
                <Button onClick={handleSubmit} isDisabled={permission===""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

