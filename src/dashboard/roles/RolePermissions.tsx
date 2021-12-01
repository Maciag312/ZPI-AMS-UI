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
import {  useAssignPermissionToRole, useRemovePermissionFromRole } from "./Roles.helpers";
import {  ChangeEvent, FC, useEffect, useState } from "react";
import Permission from "../../common/Permission";
import Role from "../../common/Role";

interface RolePermissionsI {
    roles: Role[],
    availablePermissions: Permission[]
}


export const RolePermissions: FC<RolePermissionsI> = ({roles, availablePermissions} : RolePermissionsI) => {

    const [selectedRole, setSelectedRole] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState(roles.filter(r=>r.role===selectedRole)[0]?.permissions)

    const assignPermissionToRole = useAssignPermissionToRole()
    const removePermissionFromRole = useRemovePermissionFromRole()

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value)
        setSelectedRole(event.currentTarget.value)
    }

    useEffect(()=>{
        setSelectedPermissions(roles.filter(r=>r.role===selectedRole)[0]?.permissions)
    }, [roles, selectedRole])


    const createPermissionTable = (permissions: Permission[]) => { 
        return (

        <>
        {permissions.length > 0 && selectedRole !== "" ? 
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
                removePermissionFromRole(selectedRole, per)
                setSelectedPermissions(selectedPermissions.filter(p => p.permission!==per))
            } else {
                assignPermissionToRole(selectedRole, per)
                setSelectedPermissions(selectedPermissions => [...selectedPermissions, {permission: per}])
            }
        }
    }

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >Permissions</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Assign or remove permissions</Text>
        <Box marginTop="20px" rounded="lg" width="100%" backgroundColor="#FEFCFC">
        <Text padding="20px 20px 0px 20px"  color="#C7C7C7" fontWeight="semibold" >Roles list</Text>
        <Box padding="20px">

            <Select id="selected_roles" onChange={handleRoleChange} placeholder="Select role" >
                {
                    roles.map(r => {
                        return (<option value={r.role}>{r.role}</option>)
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