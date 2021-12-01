import Rule from "../../../common/Rule";
import groupClient from "../../api/GroupsClient"

export const usePutRule = () => {
    const handleSubmit = (rule: Rule, group: string) => {
        return groupClient.putRule(rule, group)
    };
    
      return handleSubmit;
}