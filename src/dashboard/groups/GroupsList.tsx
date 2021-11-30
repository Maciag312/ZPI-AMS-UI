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
import {  useRemoveGroup } from "./Groups.helpers";
import {  FC } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import IGroups from "./IGroup";
import Group from "../../common/Group";
import { isSecurityEnabled } from "../../common/Security";
import {AiOutlineEllipsis, AiOutlineDelete} from "react-icons/ai";
import NewGroup from "./NewGroup";
import { chooseColor } from "./ChooseColor";



export const GroupsList: FC<IGroups> = ({groups} : IGroups) => {

    const cookies = new Cookies()
    const history = useHistory()


    const removeGroup = useRemoveGroup()

    const handleRemoveGroup = (event: React.MouseEvent<HTMLButtonElement>) => {
        removeGroup(event.currentTarget.id)
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

    const createGroupsTable = () => { 
        return (
        <>
        {groups.length > 0 ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>group </Th>
                        <Th> </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {groups.map(per =>  createRow(per))}
                </Tbody>
            </Table> 
            : <> <Box  width="100%">
                <Center padding="20px">
                 <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no groups available. </Text>
                 </Center>
                </Box></>
        }
        </> )
    }


    const createRow = (rol: Group) => {
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

    const createTag = (rol: Group) => { 
        return <Tag fontWeight="semibold" color="white" bgColor={chooseColor(rol.color)}>{rol.group}</Tag>
    }

    const createMenu = (rol: Group) => {
        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineEllipsis/>}
                    variant="outline"
                />
                <MenuList minW="0" maxW="150px">
                    <MenuItem id={rol.group} color="red" onClick={handleRemoveGroup} icon={<AiOutlineDelete />} >
                        Remove
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >List</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove groups</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
            <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Groups list</Text>
            <NewGroup/>
            <Box margin="20px">
                {createGroupsTable()}
            </Box>
        </Box>
        
    </Box>

    )

}