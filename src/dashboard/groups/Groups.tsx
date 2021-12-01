import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import Permission from "../../common/Permission";
import Group from "../../common/Group";
import { isSecurityEnabled } from "../../common/Security";
import { useFetchPermissions } from "../permissions/Permissions.helpers";
import { GroupPermissions } from "./GroupPermissions";
import { useFetchGroups } from "./Groups.helpers";
import { GroupsList } from "./GroupsList";
import { Rule } from "./rule/Rule";

export default function Groups() {

    const history = useHistory()
    const cookies = new Cookies()

    const fetchGroups = useFetchGroups()
    const fetchAvailablePermissions = useFetchPermissions()

    const [groups, setGroups] = useState([] as Group[])
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
        
        fetchGroups()
        .then( (response) => {
            console.log(response.data)
            if(response.status === 200) {
                setGroups(response.data)
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
                    <Tab _selected={{color: "#7EB6AB", borderBottomColor: "#7EB6AB"}}>Rule Matchers</Tab>
                </TabList>
                <Center>
                    <TabPanels maxWidth="75%">
                        <TabPanel>
                            <GroupsList groups={groups}/>
                        </TabPanel>
                        <TabPanel>
                            <GroupPermissions availablePermissions={availablePermissions} groups={groups}/>
                        </TabPanel>
                        <TabPanel>
                            <Rule groups={groups}/>
                        </TabPanel>
                    
                    </TabPanels>
                </Center>
            </Tabs>
        </Box>)
}
