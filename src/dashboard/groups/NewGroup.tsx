import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import {BiGroup } from "react-icons/bi";
import { useAddGroup } from "./Groups.helpers";
import { BiColorFill } from "react-icons/bi";
import { chooseColor } from "./ChooseColor";

export default function NewGroup() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [group, setGroup] = useState("")
    const [chosenColor, setChosneColor] = useState("1")

    const addGroup = useAddGroup()

    const handleSubmit = () => { 
        addGroup(group, chosenColor)
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
         <Button onClick={onOpen} leftIcon={<BiGroup/>} colorScheme="green" marginRight="20px" float="right">New Group</Button>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create new group</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={1}>
                <FormControl>
                    <FormLabel>Group</FormLabel>
                    <Input onChange={e=>setGroup(e.currentTarget.value)} placeholder="group name" />
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
                <Button onClick={handleSubmit} isDisabled={group===""}  colorScheme="green" mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

