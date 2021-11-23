import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import Client from "../../common/Client";
import { useFetchClients } from "./Clients.helpers";
import {ClientsList} from "./ClientsList";
import {ClientRedirections} from "./redirect/ClientRedirections";
import { isSecurityEnabled } from "../../common/Security";

export default function Clients() {

    const history = useHistory()
    const cookies = new Cookies()

    const fetchClients = useFetchClients()
    const [clients, setClients] = useState([] as Client[])

    useEffect(() => {
        fetchClients()
        .then( (response) => {
            console.log(response.data)
            if(response.status === 200) {
                setClients(response.data)
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
                    <Tab _selected={{color: "#7EB6AB", borderBottomColor: "#7EB6AB"}}>Redirections</Tab>
                </TabList>
                <Center>
                    <TabPanels maxWidth="75%">
                        <TabPanel>
                            <ClientsList clients={clients}/>
                        </TabPanel>
                        <TabPanel>
                            <ClientRedirections clients={clients} />
                        </TabPanel>
                    </TabPanels>
                </Center>
            </Tabs>
        </Box>)
}
