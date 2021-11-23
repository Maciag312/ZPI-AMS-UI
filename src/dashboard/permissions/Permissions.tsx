import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import Permission from "../../common/Permission";
import { isSecurityEnabled } from "../../common/Security";
import { useFetchPermissions } from "./Permissions.helpers";
import {PermissionsList} from "./PermissionsList";

export default function Permissions() {

    const history = useHistory()
    const cookies = new Cookies()

    const fetchPermissions = useFetchPermissions()
    const [permissions, setPermissions] = useState([] as Permission[])

    useEffect(() => {
        fetchPermissions()
        .then( (response) => {
            console.log(response.data)
            if(response.status === 200) {
                setPermissions(response.data)
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
                </TabList>
                <Center>
                    <TabPanels maxWidth="75%">
                        <TabPanel>
                            <PermissionsList permissions={permissions}/>
                        </TabPanel>
                    
                    </TabPanels>
                </Center>
            </Tabs>
        </Box>)
}
