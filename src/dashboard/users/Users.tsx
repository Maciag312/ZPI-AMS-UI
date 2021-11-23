import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import { isSecurityEnabled } from "../../common/Security";
import User from "../../common/User";
import { useFetchUsers } from "./Users.helpers";
import {UsersList} from "./UsersList";

export default function Users() {

    const history = useHistory()
    const cookies = new Cookies()

    const fetchUsers = useFetchUsers()
    const [users, setUsers] = useState([] as User[])

    useEffect(() => {
        fetchUsers()
        .then( (response) => {
            console.log(response.data)
            if(response.status === 200) {
                setUsers(response.data)
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
                            <UsersList users={users}/>
                        </TabPanel>
                    </TabPanels>
                </Center>
            </Tabs>
        </Box>)
}
