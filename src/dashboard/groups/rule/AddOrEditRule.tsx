import { Button, Box, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Select } from "@chakra-ui/react";
import {  FC, useEffect, useState } from "react";
import {BiGroup } from "react-icons/bi";
import Rule from "../../../common/Rule";
import { usePutRule } from "./Rule.helpers";


interface IAddOrEditRule {
    groupName: string,
    rule: Rule,
}

export const AddOrEditRule: FC<IAddOrEditRule> = ({groupName, rule} : IAddOrEditRule) => {

    interface LooseObject {
        [key: string]: any
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [matchers, setMatchers] = useState(rule?.matchers)

    const types = ['numeric', 'string']

    const operators = {numeric : ['greater than', 'less than', 'equals', 'not equals', 'greater or equal', 'less or equal'], string: ['equals', 'is not equal', 'starts with', 'contains']} as LooseObject
    const [rulename, setRuleName] = useState(rule?.name)

    useEffect(()=> {
        setMatchers(rule?.matchers)
        setRuleName(rule?.name)
    }, [groupName, rule])

    const putRule = usePutRule()

    const handleSubmit = () => { 
        putRule({name: rulename, matchers: matchers}, groupName).finally(() =>
            {} //window.location.reload()
        )
    }

    const handleChooseType = (index: number, type: string) => {
        var match = [...matchers]
        match[index].type = type 
        match[index].operator = operators[type][0] 
        setMatchers(match)
    }

    const handleChooseOperator = (index: number, operator: string) => {
        console.log(operator)
        var match = [...matchers]
        match[index].operator = operator 
        setMatchers(match)
    }

    const handleChangExpectedValue = (index: number, value: string) => {
        var match = [...matchers]
        match[index].expected = value 
        setMatchers(match)
    }
    
    const handleChooseAttribute = (index: number, attribute: string) => {
        var match = [...matchers]
        match[index].attribute = attribute 
        setMatchers(match)
    }

    const handleNewMatcher = () => {
        setMatchers([...matchers, {attribute: "", type: "string", operator: "equals", expected: ""}])
    }

    const createModalBody = () => {

        return (
            <ModalBody pb={1}>

            <FormLabel>Rule</FormLabel>
            <Input value={rulename} onChange={e=>setRuleName(e.currentTarget.value)}/>

                {matchers?.map((mat, index) => {
                     return <Box width="100%">

                        <Select fontWeight="semibold" mt={4} width={120} float="left" id="selected_types" value={mat.type}
                         onChange={e=>handleChooseType(index, e.currentTarget.value)}  >
                            {
                                types.map(tp => { return (<option value={tp}>{tp}</option>)})
                            }
                        </Select>
                        <Input ml={4} mt={4} width={140} value={mat.attribute} float="left" onChange={e=>handleChooseAttribute(index, e.currentTarget.value)}  placeholder="attribute" />
                        <Select fontStyle="italic" fontWeight="semibold" ml={4} mt={4} width={150} float="left" id="selected_operators" value={mat.operator} 
                            onChange={e=>handleChooseOperator(index, e.currentTarget.value)}  >
                            {
                                operators[mat.type].map((op: string)=> { return (<option value={op}>{op}</option>)})
                            }
                        </Select>
                        <Input ml={4} mt={4} width={165} value={mat.expected}  onChange={e=>handleChangExpectedValue(index, e.currentTarget.value)} placeholder="expected value" />
                    </Box>
                })}
                <Button mt={4} onClick={handleNewMatcher} colorScheme="green">New matcher</Button>
            </ModalBody>
        )
    }

    return ( 
        groupName !== "" ? 
        <Box>
         <Button onClick={onOpen} leftIcon={<BiGroup/>} colorScheme={rule?.name===""?"green":"purple"} marginRight="20px" float="right">
            {rule?.name===""?"Add Rule":"Modify Rule"} 
             </Button>
            <Modal size="3xl" isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rule</ModalHeader>
                <ModalCloseButton />
                    {createModalBody()}
                <ModalFooter>
                <Button onClick={handleSubmit} isDisabled={groupName===""}  colorScheme="blue" mr={3}>
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
    </Box> : <></>
    )


}