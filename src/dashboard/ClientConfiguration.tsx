import { Box} from "@chakra-ui/layout"
import { Button, Textarea } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import {
    Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react"

import "./style.css";
import { useClientAddition, useFetchClients, useRemoveClient, useRemoveURIFromClient } from "./ClientConfiguration.helpers";
import { useState, useEffect } from "react";
import Client from "../common/Client";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";


export default function ClientConfiguration() {

    const history = useHistory()
    const cookies = new Cookies()

    const [clientId, setClientId] = useState("")
    const [redirectionURIs, setRedirectionURIs] = useState([] as string[])

    const addClient = useClientAddition()
    const fetchClients = useFetchClients()
    const removeClient = useRemoveClient()
    const removeUriFromClient = useRemoveURIFromClient()

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
            history.push("/dashboard/signin")
        })
        // eslint-disable-next-line
    }, [])

    const handleSubmit = () => { 
        let client = {id: clientId, availableRedirectUris: redirectionURIs}
        addClient(client)
        window.location.reload()
    }

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => { 
        setClientId(event.currentTarget.value)
    }

    const handleTextAreaChange = (event: React.FormEvent<HTMLTextAreaElement>) => { 
        setRedirectionURIs(event.currentTarget.value.split(", "))
    }

    const submitClientDeletion = (event: React.MouseEvent<HTMLButtonElement>) => {
        let id = event.currentTarget.id;
        console.log("Remove client with id: " + id + " is actioned.")
        removeClient(event.currentTarget.id)
        let modifedClients = clients.filter(c=>c.id !== id)
        setClients(modifedClients)
    }

    
    const createAccodition = (clients: Client[]) => {
        return (
                <Accordion allowToggle backgroundColor="whitesmoke">
                    {clients.map(c => createAccordionItem(c))}
                </Accordion>)
    }

    const createAccordionItem = (client: Client) => {
        return (
            <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        client {client.id}
                    </Box>
                    <AccordionIcon/>
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {createTable(client)}
                <Button id={client.id} size="sm" onClick={submitClientDeletion} colorScheme="red"> Remove </Button>
            </AccordionPanel>
        </AccordionItem>
        )
    }

    const createTable = (client: Client) => { 
        return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>redirect uri</Th>
                    <Th> </Th>
                </Tr>
            </Thead>
            <Tbody>
                {createRows(client)}
            </Tbody>
        </Table> )
    }

   
    const separator = "$#*#$"

    const submitRedirectDeletion = (event: React.MouseEvent<HTMLButtonElement>) => {
        const idAndUri =  event.currentTarget.id.split(separator)
        console.log(event.currentTarget.id)
        console.log(idAndUri)
        if( idAndUri[1] !== undefined || idAndUri[0] !== undefined) {
            let id = idAndUri[0]
            let uri = idAndUri[1]
            console.log("Remove uri: " + id + " of client: " + uri + " is actioned.")
            removeUriFromClient(id, uri)
            window.location.reload()
        }
    }

    const createRows = (client: Client) => {
        return client.availableRedirectUris.map(uri => 
            <Tr>
                <Td>{uri}</Td>
                <Td>
                    <Button id={client.id + separator + uri} onClick={submitRedirectDeletion} float="right" rounded="full" size="sm" colorScheme="red"> - </Button>
                </Td>
            </Tr>
        )
    }

    return (
    <div>
        <Box className="ClientConfigurationWrapper">
            <Box className="ClientConfigurationBox" rounded="lg">
                <Box></Box>
                <Text fontSize="3xl">Client configuration</Text>
                <Input onChange={handleInputChange}  style={{maxWidth: "700px", margin: "15px auto 10px auto", backgroundColor: "white"}} placeholder = "client id"></Input>
                <Textarea onChange={handleTextAreaChange} placeholder = "Please set redirection uris here:" style={{maxWidth: "700px", margin: "0px auto 10px auto", backgroundColor: "white"}}></Textarea>
                <br></br>
                <Button onClick={handleSubmit} style={{padding: "30px auto 10px auto"}} colorScheme="green">Add</Button>
                {createAccodition(clients)}
            </Box>
        </Box>
    </div>
    )

}