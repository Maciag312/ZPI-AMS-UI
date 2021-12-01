import { Box} from "@chakra-ui/layout"


import "./../../../common/style.css";
import { FC} from "react";
import Matcher from "../../../common/Matcher";
import { Table, Thead, Tr, Th, Tbody, Td, Center, Text } from "@chakra-ui/react";

interface IMatchers {
    matchers: Matcher[],
}


export const Matchers: FC<IMatchers> = ({matchers} : IMatchers) => {


    const createRow = (matcher: Matcher) => {
        return <Tr>
            <Td>{matcher.attribute}</Td>
            <Td fontStyle="italic" fontWeight="semibold">{matcher.operator}</Td>
            <Td>{matcher.expected}</Td>
                
        </Tr> 
    }

    return (
        matchers!==undefined?
    <Box>
       <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>attribute </Th>
                        <Th>operator </Th>
                        <Th>expected </Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {matchers.map(matcher =>  createRow(matcher))}
                </Tbody>
        </Table>
    </Box>:<> <Box  width="100%">
                <Center padding="20px">
                    <Text  color="#767676" fontSize="18px" fontWeight="bold" > There are no matchers available. </Text>
                </Center>
            </Box></>

    )

}