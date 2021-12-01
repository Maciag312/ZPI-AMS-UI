import { Box} from "@chakra-ui/layout"
import { Checkbox, Select } from "@chakra-ui/react"
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
import {  useAssignPermissionToGroup, useRemovePermissionFromGroup } from "./Groups.helpers";
import {  ChangeEvent, FC, useEffect, useState } from "react";
import Permission from "../../common/Permission";
import Group from "../../common/Group";

interface GroupPermissionsI {
    groups: Group[],
    availablePermissions: Permission[]
}


export const GroupPermissions: FC<GroupPermissionsI> = ({groups, availablePermissions} : GroupPermissionsI) => {

    const [selectedGroup, setSelectedGroup] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState(groups.filter(r=>r.group===selectedGroup)[0]?.permissions)

    const assignPermissionToGroup = useAssignPermissionToGroup()
    const removePermissionFromGroup = useRemovePermissionFromGroup()

    const handleGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value)
        setSelectedGroup(event.currentTarget.value)
    }

    useEffect(()=>{
        setSelectedPermissions(groups.filter(r=>r.group===selectedGroup)[0]?.permissions)
    }, [groups, selectedGroup])


    const createPermissionTable = (permissions: Permission[]) => { 
        return (

        <>
        {permissions.length > 0 && selectedGroup !== "" ? 
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>is </Th>
                        <Th>permission</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {permissions.map(per =>  createRow(per, selectedPermissions?.map(p=>p.permission).includes(per.permission)))}
                </Tbody>
            </Table> 
            : null
        }
        </> )
    }


    const createRow = (per: Permission, isChecked: boolean) => {
        return (
            <Tr>
                <Td><Checkbox id={per.permission} onChange={onCheckboxClick} isChecked={isChecked}></Checkbox></Td>
                <Td>
                {per.permission}
                </Td>
            </Tr> )
    }

    const onCheckboxClick = (event: any) => { 
        let per = event.currentTarget.id
        if(selectedPermissions !=null) {
            if(selectedPermissions.map(p=>p.permission).includes(per)) {
                removePermissionFromGroup(selectedGroup, per)
                setSelectedPermissions(selectedPermissions.filter(p => p.permission!==per))
            } else {
                assignPermissionToGroup(selectedGroup, per)
                setSelectedPermissions(selectedPermissions => [...selectedPermissions, {permission: per}])
            }
        }
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >Permissions</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Assign or remove permissions</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
        <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Groups list</Text>
        <Box padding="20px">

            <Select id="selected_groups" onChange={handleGroupChange} placeholder="Select group" >
                {
                    groups.map(r => {
                        return (<option value={r.group}>{r.group}</option>)
                    })
                }
            </Select>
        </Box>
            <Box margin="20px">
                {createPermissionTable(availablePermissions)}
            </Box>
        </Box>
        
    </Box>

    )

}