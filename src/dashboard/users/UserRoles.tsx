import { Button, Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, MenuItem, HStack, Tag, TagLabel } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Role from "../../common/Role";
import { useFetchRoles } from "../roles/Roles.helpers";
import { useAssignRoleToUser, useFetchUserInfo, useRemoveRoleFromUser } from "./Users.helpers";
import {BiIdCard} from "react-icons/bi";

interface IUserRoles {
    userEmail: string,
}

export const UserRoles: FC<IUserRoles> = ({userEmail} : IUserRoles) => {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchRoles = useFetchRoles()
    const assignRoleToUser = useAssignRoleToUser()
    const fetchUserInfo = useFetchUserInfo()
    const removeRoleFromUser = useRemoveRoleFromUser()

    const [userRoles, setUserRoles] = useState([] as string[])
    const [availableRoles, setAvailableRoles] = useState([] as Role[])

    useEffect(()=>{
        if(isOpen) {
            fetchRoles()
            .then(
                res => {
                    if(res.status === 200) {
                        console.log(res.data)
                        setAvailableRoles(res.data)
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )

            fetchUserInfo(userEmail)
            .then(
                res => {
                    if(res.status === 200) {
                        console.log(res.data)
                        setUserRoles(res.data.roles)
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )

        }
    // eslint-disable-next-line
    }, [isOpen, userEmail]) 
    

    const toggleRole = (event: React.MouseEvent<HTMLSpanElement>) => {
        let role = event.currentTarget.id
        if(!userRoles.includes(role)) {
            setUserRoles([...userRoles, role])
            assignRoleToUser(userEmail, role)
        } else { 
            setUserRoles(userRoles.filter(r => r !== role))
            removeRoleFromUser(userEmail, role)
        }
    }

    return ( 
        <Box>
            <MenuItem icon={<BiIdCard/>} onClick={onOpen}>
                 Roles
            </MenuItem>
            <Modal isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User roles</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <HStack spacing={4}>
                    {availableRoles.map((availableRole) => 
                        <Tag cursor="pointer" size="lg" onClick={toggleRole}  id={availableRole.role} key={availableRole.role} variant="solid" backgroundColor={userRoles.includes(availableRole.role)?"green":"LightGray"}>
                            <TagLabel>{availableRole.role}</TagLabel>
                        </Tag>)
                    }
                    </HStack>
                </ModalBody>

                <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>Save</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box>
    )

}