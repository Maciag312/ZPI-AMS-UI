import { Box} from "@chakra-ui/layout"
import { Select } from "@chakra-ui/react"
import {
    Text,

} from "@chakra-ui/react"

import "./../../../common/style.css";
import {  ChangeEvent, FC, useEffect, useState } from "react";
import Group from "../../../common/Group";
import { Matchers } from "./Matchers";
import { AddOrEditRule } from "./AddOrEditRule";

interface IRule {
    groups: Group[],
}


export const Rule: FC<IRule> = ({groups} : IRule) => {

    const [selectedGroup, setSelectedGroup] = useState("")
    const [ruleName, setRuleName] = useState(groups.filter(r=>r.group===selectedGroup)[0]?.rule?.name)
    const [matchers, setMatchers] = useState(groups.filter(r=>r.group===selectedGroup)[0]?.rule?.matchers)
    const [rule, setRule] = useState(groups.filter(r=>r.group===selectedGroup)[0]?.rule)

    const handleGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value)
        setSelectedGroup(event.currentTarget.value)
    }

    useEffect(()=>{
        setRuleName(groups.filter(r=>r.group===selectedGroup)[0]?.rule?.name)
        setMatchers(groups.filter(r=>r.group===selectedGroup)[0]?.rule?.matchers)
        setRule(groups.filter(r=>r.group===selectedGroup)[0]?.rule)
    }, [groups, selectedGroup])

    return (
    <Box>
        <Text marginTop="10px" fontSize="4xl" fontWeight="semibold" >Rule Matchers</Text>
        <Text marginTop="10px" fontSize="lg" color="#C7C7C7" fontWeight="semibold" >Register or remove rule matchers</Text>
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
                <AddOrEditRule groupName={selectedGroup} rule={rule} />
                <Text fontWeight="semibold" mb={4} fontSize="2xl">{ruleName}</Text>
                <Matchers matchers={matchers}></Matchers>
            </Box>
        </Box>
        
    </Box>

    )

}