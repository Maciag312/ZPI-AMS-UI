import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Select, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import React, { FC } from "react"
import { useRemoveURIFromClient } from "../Clients.helpers"
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom"
import IClients from "../IClients";
import { isSecurityEnabled } from "../../../common/Security";
import {AiOutlineEllipsis, AiOutlineDelete} from "react-icons/ai";
import { NewRedirection } from "./NewRedirection";

export const ClientRedirections: FC<IClients> = ({clients} : IClients) => {

    const cookies = new Cookies()
    const history = useHistory()

    const removeUriFromClient = useRemoveURIFromClient()

    const [selectedClientID, setSelectedClientID] = React.useState("")

    const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClientID(event.currentTarget.value as string)
    }
    const createRedirectURIsTable = () => { 
        let selectedClient = clients.filter(c=>c.id===selectedClientID)[0]

        return (
        <>
        {selectedClient !== undefined ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>uri </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {selectedClient
                        .availableRedirectUris
                        .map(uri => createRow(uri, selectedClient.id))}
                </Tbody>
            </Table> 
            : null
        }
        </> )
    }

    const submitRedirectDeletion = (event: React.MouseEvent<HTMLButtonElement>) => {
        const uri =  event.currentTarget.id
        if( uri !== undefined || selectedClientID !== undefined) {
            console.log("Remove uri: " + selectedClientID + " of client: " + uri + " is actioned.")
            removeUriFromClient(selectedClientID, uri)
            .catch((error)=> {
                console.log(error);
                cookies.remove("jwt_token")
                if(isSecurityEnabled) {
                    history.push("/dashboard/signin")
                }
            })
            .finally(()=>{
                window.location.reload()
            })
        }
    }

    const createRow = (uri: string, clientId: string) => {
        return (
            <Tr>
                <Td>{uri}</Td>
                <Td>
                    <Box float="right">
                        {createMenu(uri)}
                    </Box>
                </Td>
            </Tr> )
    }

    const createMenu = (uri: string) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="150px">
                    <MenuItem id={uri} color="red" onClick={submitRedirectDeletion} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }


    return (<Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >Redirections</Text>
            <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >After authorizing your user will be redirected back to provided url </Text>
            <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
                <Text padding="20px 20px 0px 20px" color="#C7C7C7" fontWeight="semibold" >Choose client</Text>
                <NewRedirection clientId={clients.filter(c=>c.id===selectedClientID)[0]?.id as string}/>
                <Box padding="20px">
                    <Select id="selected_client" onChange={handleClientChange} placeholder="Select client" >
                        {
                            clients.map(client => {
                                return (<option value={client.id}>{client.id}</option>)
                            })
                        }
                    </Select>
                    {createRedirectURIsTable()}
                </Box>     
            </Box>
    </Box>)

}