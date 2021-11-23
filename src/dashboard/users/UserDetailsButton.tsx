import { Button, Box, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import {AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useFetchUserInfo, usePutUserAttributes } from "./Users.helpers";
import { IconButton } from "@chakra-ui/react"


interface IUserDetailsButton {
    email: string,
}

export const UserDetailsButton: FC<IUserDetailsButton> = ({email} : IUserDetailsButton) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [attributeToAdd, setAttributeToAdd] = useState("Attribute")
    const [attributes, setAttributes] = useState({} as LooseObject)

    const putUserAttributes = usePutUserAttributes()

    const fetchUserInfo = useFetchUserInfo()

    useEffect(()=>{
        if(isOpen) {

            fetchUserInfo(email)
            .then(
                res => {
                    if(res.status === 200) {
                        console.log(res.data)
                        setAttributes(res.data.attributes)
                    }
                }
            ).catch(
                err => {
                    console.log(err) 
                }
            )

        }
    // eslint-disable-next-line
    }, [isOpen, email]) 
    

    interface LooseObject {
        [key: string]: any
    }


    const handleSubmit = () => { 
        putUserAttributes(email, attributes).finally( () => {
                window.location.reload()
            }
        )
    }

    const handleRemoveAttribute = (event: React.MouseEvent<HTMLButtonElement>) => {
        let attrs = {...attributes}
        delete attrs[event.currentTarget.id]
        console.log(attrs)
        setAttributes(attrs)    
    }

    const createAttributes = () => {
        return (
            <Box>
                {Object.entries(attributes).map(([key, value]) => {
                    return (
                        <Box>
                            <FormControl float="left" width="45%" mt={4}>
                                    <Input isDisabled={true} value={key} placeholder="Attribute" />
                            </FormControl>
                            <FormControl ml={4} float="left" width="40%" mt={4}>
                                    <Input onChange={handleOnChangeAttributeValue} id={key} value={value} placeholder="Value" />
                            </FormControl>
                            <IconButton id={key} onClick={handleRemoveAttribute} ml={4} mt={4} float="left" aria-label="Remove attribute" icon={<AiOutlineDelete />}/>

                        </Box>
                        )})}
            </Box>
        )
    }

    const handleOnChangeAttributeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        let attrs = {...attributes}
        attrs[event.currentTarget.id] = event.currentTarget.value
        setAttributes(attrs)
    }

    const handleAddAttribute = () => {
        let attrs = {...attributes}
        attrs[attributeToAdd] = ""
        setAttributes(attrs)
    }
  
    return ( 
        <Box>
         <Button onClick={onOpen} variant="outline" colorScheme="green">Details</Button>
            <Modal size="xl" isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>User details</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input isReadOnly={true} isDisabled={true} value={email} />
                    </FormControl>
                    
                    <FormControl mt={4}>
                        <FormLabel>Username</FormLabel>
                        <Input isReadOnly={true} isDisabled={true} placeholder="Username" />
                    </FormControl>

                    <FormLabel mt={4} width="46%" float="left">Attributes</FormLabel>
                    <FormLabel mt={4}  width="45%" float="left">Values</FormLabel>

                    {createAttributes()}

                    <FormControl float="left" width="45%" mt={4}>
                        <Input value={attributeToAdd} onChange={e=>setAttributeToAdd(e.currentTarget.value)} />
                    </FormControl>

                    <Button  ml={4} mt={4} float="left" onClick={handleAddAttribute} variant="outline" colorScheme={"green"} leftIcon={<AiOutlinePlus/>}>Value</Button>
                </ModalBody>

                <ModalFooter>
                    <Button  onClick={handleSubmit} colorScheme="blue" mr={3}>
                        Save
                    </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}

