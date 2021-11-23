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

import {AiOutlineEllipsis, AiOutlineDelete} from "react-icons/ai";

import "./../../common/style.css";
import { useRemoveClient } from "./Clients.helpers";
import { FC } from "react";
import Client from "../../common/Client";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import IClients from "./IClients";
import { isSecurityEnabled } from "../../common/Security";
import NewClient from "./NewClient";


export const ClientsList: FC<IClients> = ({clients} : IClients) => {

    const cookies = new Cookies()
    const history = useHistory()

    const removeClient = useRemoveClient()

    const handleRemoveClient = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("removing client")
        removeClient(event.currentTarget.id)
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

    const createClientsTable = () => { 
        return (
        <>
        {clients.length > 0 ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>client </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {clients.map(client =>  createRow(client))}
                </Tbody>
            </Table> 
            : <> <Box  width="100%">
                <Center padding="20px">
                <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no clients available. </Text>
                </Center>
            </Box></>
        }
        </> )
    }

    const createRow = (client: Client) => {
        return (
            <Tr>
                <Td>{client.id}</Td>
                <Td>
                    <Box float="right">
                        {createMenu(client)}
                    </Box>
                </Td>
            </Tr> )
    }

    const createMenu = (client: Client) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="150px">
                    <MenuItem id={client.id} color="red" onClick={handleRemoveClient} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >List</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove clients</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
            <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Clients list</Text>
            <NewClient/>
            <Box margin="20px">
                {createClientsTable()}
            </Box>
        </Box>
        
    </Box>

    )

}