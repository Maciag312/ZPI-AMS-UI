import { Box} from "@chakra-ui/layout"
import { Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag } from "@chakra-ui/react"
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
import { useRemoveUser } from "./Users.helpers";
import { FC } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import IUsers from "./IUsers";
import User from "../../common/User";
import { isSecurityEnabled } from "../../common/Security";
import {AiOutlineEllipsis, AiOutlineDelete, AiOutlineUserSwitch} from "react-icons/ai";
import {BiRefresh} from "react-icons/bi"
import NewUser from "./NewUser";
import {UserRoles} from "./UserRoles";
import {UserDetailsButton} from "./UserDetailsButton";


export const UsersList: FC<IUsers> = ({users} : IUsers) => {

    const cookies = new Cookies()
    const history = useHistory()

    const removeUser = useRemoveUser()

    const handleRemoveUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeUser(event.currentTarget.id)
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

    const createUsersTable = () => { 
        return (
        <>
        {users.length > 0 ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Active</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(usr =>  createRow(usr))}
                </Tbody>
            </Table> 
            : <> <Box  width="100%">
                <Center padding="20px">
                <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no users available. </Text>
                </Center>
            </Box></>
        }
        </> )
    }

    const createRow = (usr: User) => {
        return (
            <Tr>
                <Td>{usr.username}</Td>
                <Td>{usr.email}</Td>
                <Td>{isActiveBox(usr.isActive)}</Td>
                <Td>
                    <Box float="right">
                        <UserDetailsButton email={usr.email}></UserDetailsButton>
                    </Box>
                </Td>
                <Td>
                    <Box float="right">
                        {createMenu(usr)}
                    </Box>
                </Td>
            </Tr> )
    }

    const isActiveBox = (isActive: boolean) => {
        let message = isActive? "ACTIVE" : "INACTIVE"
        return <Tag color="white" backgroundColor={isActive?"green":"LightGray"}>{message}</Tag>
    }

    const createMenu = (usr: User) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="210px">
                    <MenuItem id={usr.username} color="red" onClick={handleRemoveUser} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                    <UserRoles userEmail={usr.email} ></UserRoles>
                    {createToggleActivateItem(usr)}
                    {createRenewPasswordItem(usr)}
                </MenuList>
            </Menu>
        )
    }

    const createRenewPasswordItem = (user: User) => {
        return (<MenuItem
            icon={<BiRefresh/>}>
                Renew password
        </MenuItem>)
    }

    const createToggleActivateItem = (user: User) => {
        return (<MenuItem
            icon={<AiOutlineUserSwitch/>}>
           {user.isActive===true?"Deactiavte":"Actiavte"}
        </MenuItem>)
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >List</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove Users</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
            <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Users list</Text>
            <NewUser/>
            <Box margin="20px">
                {createUsersTable()}
            </Box>
        </Box>
        
    </Box>

    )

}