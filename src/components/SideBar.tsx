import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import "../common/style.css"
import { CLIENTS, ROLES, PERMISSONS, USERS, GROUPS } from "../Routes"
import {BiIdCard, BiUser, BiLockAlt, BiSitemap, BiGroup } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function SideBar() {

    const isSelected = (uri: string) => window.location.pathname.split("?")[0] === uri;

    const [width, setWidth] = useState(window.innerWidth)

    useEffect( () => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [width])

    return (
        <Box style={{width: "250px", borderRight: "2px solid #E8E8E8", backgroundColor: "#FEFCFC", height: "100vh", position: "fixed"}}>
            <Box height="70px">
                <Center marginTop="20px">
                    <Text color="#99DACE" fontSize="4xl" fontStyle="italic" fontWeight="bold">AMS</Text>
                </Center>
            </Box>
            <hr style={{borderTopWidth: "2px", borderColor: "#E8E8E8"}} />
            <Center margin="20px auto 20px auto">
                <Box bgColor="#424242" boxSize="10" rounded="md">
                    <Center marginTop="2px" color="white" fontSize="2xl" fontWeight="bold">A</Center>
                </Box>
                <Text color="#424242" fontSize="lg" fontWeight="semibold" marginLeft="15px" marginRight="60px">Admin</Text>
            </Center>
            <VStack spacing={4}>
                 <Box w="90%" p={2} rounded="md" color={isSelected(CLIENTS)?"#7EB6AB":"#C5C5C5"} backgroundColor={isSelected(CLIENTS)?"#EAF5F3":"none"} _hover={{color: '#7EB6AB'}}>
                    <Link to={CLIENTS}>
                        <Box marginTop="3px" marginRight="6px" marginLeft="6px" float="left">
                            <BiSitemap/>
                        </Box>
                         <Text marginLeft="10px" fontWeight="bold">Clients</Text>
                    </Link>
                 </Box>
                 <Box w="90%" p={2} rounded="md" color={isSelected(USERS)?"#7EB6AB":"#C5C5C5"} backgroundColor={isSelected(USERS)?"#EAF5F3":"none"} _hover={{color: '#7EB6AB'}}>
                    <Link to={USERS}>
                        <Box marginTop="3px" marginRight="6px" marginLeft="6px" float="left">
                            <BiUser/>
                        </Box>
                         <Text marginLeft="10px" fontWeight="bold">Users</Text>
                    </Link>
                 </Box>
                 <Box w="90%" p={2} rounded="md" color={isSelected(PERMISSONS)?"#7EB6AB":"#C5C5C5"} backgroundColor={isSelected(PERMISSONS)?"#EAF5F3":"none"} _hover={{color: '#7EB6AB'}}>
                    <Link to={PERMISSONS}>
                        <Box marginTop="3px" marginRight="6px" marginLeft="6px" float="left">
                            <BiLockAlt/>
                        </Box>
                         <Text marginLeft="10px" fontWeight="bold">Permissions</Text>
                    </Link>
                 </Box>
                 <Box w="90%" p={2} rounded="md" color={isSelected(ROLES)?"#7EB6AB":"#C5C5C5"} backgroundColor={isSelected(ROLES)?"#EAF5F3":"none"} _hover={{color: '#7EB6AB'}}>
                    <Link to={ROLES}>
                        <Box marginTop="4px" marginRight="6px" marginLeft="6px" float="left">
                            <BiIdCard/>
                        </Box>
                         <Text marginLeft="10px" fontWeight="bold">Roles</Text>
                    </Link>
                 </Box>
                 <Box w="90%" p={2} rounded="md" color={isSelected(GROUPS)?"#7EB6AB":"#C5C5C5"} backgroundColor={isSelected(GROUPS)?"#EAF5F3":"none"} _hover={{color: '#7EB6AB'}}>
                    <Link to={GROUPS}>
                        <Box marginTop="4px" marginRight="6px" marginLeft="6px" float="left">
                            <BiGroup/>
                        </Box>
                         <Text marginLeft="10px" fontWeight="bold">Groups</Text>
                    </Link>
                 </Box>
            </VStack>
        </Box>)
}