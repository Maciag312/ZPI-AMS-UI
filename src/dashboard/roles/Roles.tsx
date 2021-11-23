import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import Permission from "../../common/Permission";
import Role from "../../common/Role";
import { isSecurityEnabled } from "../../common/Security";
import { useFetchPermissions } from "../permissions/Permissions.helpers";
import { RolePermissions } from "./RolePermissions";
import { useFetchRoles } from "./Roles.helpers";
import { RolesList } from "./RolesList";

export default function Roles() {

    const history = useHistory()
    const cookies = new Cookies()

    const fetchRoles = useFetchRoles()
    const fetchAvailablePermissions = useFetchPermissions()

    const [roles, setRoles] = useState([] as Role[])
    const [availablePermissions, setAvailablePermissions] = useState([] as Permission[])

    useEffect(() => {
        fetchAvailablePermissions()
        .then((response) => {
            console.log(response.data)
            if(response.status === 200) {
                setAvailablePermissions(response.data)
            }
        }).catch(error => {
            console.log(error)
            cookies.remove("jwt_token")
            if(isSecurityEnabled) {
                history.push("/dashboard/signin")
            }
        })
        
        fetchRoles()
        .then( (response) => {
            console.log(response.data)
            if(response.status === 200) {
                setRoles(response.data)
            }
        
        }).catch(error => {
            console.log(error)
            cookies.remove("jwt_token")
            if(isSecurityEnabled) {
                history.push("/dashboard/signin")
            }
        })
        // eslint-disable-next-line
    }, [])

    
    return (<Box marginLeft="250px">
            <Tabs>
                <TabList>
                    <Tab _selected={{color: "#7EB6AB", borderBottomColor: "#7EB6AB"}}>List</Tab>
                    <Tab _selected={{color: "#7EB6AB", borderBottomColor: "#7EB6AB"}}>Permissions</Tab>
                </TabList>
                <Center>
                    <TabPanels maxWidth="75%">
                        <TabPanel>
                            <RolesList roles={roles}/>
                        </TabPanel>
                        <TabPanel>
                            <RolePermissions availablePermissions={availablePermissions} roles={roles}/>
                        </TabPanel>
                    
                    </TabPanels>
                </Center>
            </Tabs>
        </Box>)
}
