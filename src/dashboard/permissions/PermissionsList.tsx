import { Box} from "@chakra-ui/layout"
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
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
import {  useRemovePermission } from "./Permissions.helpers";
import {  FC } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import IPermissions from "./IPermissions";
import Permission from "../../common/Permission";
import { isSecurityEnabled } from "../../common/Security";
import {AiOutlineEllipsis, AiOutlineDelete} from "react-icons/ai";
import NewPermission from "./NewPermission";



export const PermissionsList: FC<IPermissions> = ({permissions} : IPermissions) => {

    const cookies = new Cookies()
    const history = useHistory()
    const removePermission = useRemovePermission()

    const handleRemovePermission = (event: React.MouseEvent<HTMLButtonElement>) => {
        removePermission(event.currentTarget.id)
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

    const createPermissionsTable = () => { 
        return (
        <>
        {permissions.length > 0 ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>permission </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {permissions.map(per =>  createRow(per))}
                </Tbody>
            </Table> 
            : <> <Box  width="100%">
            <Center padding="20px">
             <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no permissions available. </Text>
             </Center>
            </Box></>
        }
        </> )
    }

    const createRow = (per: Permission) => {
        return (
            <Tr>
                <Td>{per.permission}</Td>
                <Td>
                    <Box float="right">
                        {createMenu(per)}
                    </Box>
                </Td>
            </Tr> )
    }

    const createMenu = (per: Permission) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="150px">
                    <MenuItem id={per.permission} color="red" onClick={handleRemovePermission} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >List</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove permissions</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
            <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Permissions list</Text>
            <NewPermission/>
            <Box margin="20px">
                {createPermissionsTable()}
            </Box>
        </Box>
        
    </Box>

    )

}