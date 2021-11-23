import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import {AiOutlinePlus } from "react-icons/ai";
import { useAddRole } from "./Roles.helpers";
import { BiColorFill } from "react-icons/bi";
import { chooseColor } from "./ChooseColor";

export default function NewRole() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [role, setRole] = useState("")
    const [chosenColor, setChosneColor] = useState("1")

    const addRole = useAddRole()

    const handleSubmit = () => { 
        addRole(role, chosenColor)
        window.location.reload()
    }

    const handleChooseColor = (e: any) => {
        setChosneColor(e.currentTarget.value)
    }


    const createBox = (col: string) => { 
        return <Box rounded="sm" width="20px" marginRight="5px" height="20px" backgroundColor={chooseColor(col)}></Box>
    }

    return ( 
        <Box>
         <Button onClick={onOpen} leftIcon={<AiOutlinePlus/>} colorScheme="green" marginRight="20px" float="right">New Role</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new role</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={1}>
                <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input onChange={e=>setRole(e.currentTarget.value)} placeholder="role name" />
                </FormControl>

                <Box marginTop="20px">
                    <Menu >
                        <MenuButton as={Button} rightIcon={<BiColorFill />}>
                            {createBox(chosenColor)}
                        </MenuButton>
                        <MenuList minW="0" w="50px" maxW="50px">
                            <MenuItem value="1" onClick={handleChooseColor}><Box>{createBox('1')}</Box></MenuItem>
                            <MenuItem value="2" onClick={handleChooseColor}><Box>{createBox('2')}</Box></MenuItem>
                            <MenuItem value="3" onClick={handleChooseColor}><Box>{createBox('3')}</Box></MenuItem>
                            <MenuItem value="4" onClick={handleChooseColor}><Box>{createBox('4')}</Box></MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

                </ModalBody>

                <ModalFooter>
                <Button onClick={handleSubmit} isDisabled={role===""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

