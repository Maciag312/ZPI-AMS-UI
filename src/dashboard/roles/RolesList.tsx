import { Box, Center} from "@chakra-ui/layout"
import { IconButton, Menu, MenuButton, MenuItem, MenuList, Tag } from "@chakra-ui/react"
import {
    Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

import "./../../common/style.css";
import {  useRemoveRole } from "./Roles.helpers";
import {  FC } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import IRoles from "./IRoles";
import Role from "../../common/Role";
import { isSecurityEnabled } from "../../common/Security";
import {AiOutlineEllipsis, AiOutlineDelete} from "react-icons/ai";
import NewRole from "./NewRole";
import { chooseColor } from "./ChooseColor";



export const RolesList: FC<IRoles> = ({roles} : IRoles) => {

    const cookies = new Cookies()
    const history = useHistory()


    const removeRole = useRemoveRole()

    const handleRemoveRole = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeRole(event.currentTarget.id)
        .catch((error)=> {
            console.log(error);
            cookies.remove("jwt_token")
            if(isSecurityEnabled) {
                history.push("/dashboard/signin")
            }
        })
        .finally(() => {
            window.location.reload()
        })
    }

    const createRolesTable = () => { 
        return (
        <>
        {roles.length > 0 ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>role </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {roles.map(per =>  createRow(per))}
                </Tbody>
            </Table> 
            : <> <Box  width="100%">
                <Center padding="20px">
                 <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no roles available. </Text>
                 </Center>
                </Box></>
        }
        </> )
    }


    const createRow = (rol: Role) => {
        return (
            <Tr>
                <Td>{createTag(rol)}</Td>
                <Td>
                    <Box float="right">
                        {createMenu(rol)}
                    </Box>
                </Td>
            </Tr> )
    }

    const createTag = (rol: Role) => { 
        return <Tag fontWeight="semibold" color="white" bgColor={chooseColor(rol.color)}>{rol.role}</Tag>
    }

    const createMenu = (rol: Role) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="150px">
                    <MenuItem id={rol.role} color="red" onClick={handleRemoveRole} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >List</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove roles</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
            <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Roles list</Text>
            <NewRole/>
            <Box margin="20px">
                {createRolesTable()}
            </Box>
        </Box>
        
    </Box>

    )

}