import axios, { AxiosResponse } from "axios";
import URICreator from "./URICreator";
import Cookies from "universal-cookie";
import AddGroup from "../../common/AddGroup";
import Rule from "../../common/Rule";

class GroupsClient  {
    
    fetchStubGroups(): Promise<any> {
        var canBeHired = {attribute: "age", expected: "17", type: "numeric", operator: "greater than"}
        var devProfession = {attribute: "profession", expected: "computer-science", type: "string", operator: "equals"}

        return Promise.resolve({
            data : [
              { 
                group: "writers",
                color: "1",
                permissions: [{permission: "blog:edit"}, {permission: "blog:write"}, {permission: "blog:modify"}],
                rule: {name: "can be hired", matchers: [canBeHired]}
              },
              {
                group: "devs",
                color: "1",
                permissions: [{permission: "code:edit"}, {permission: "code:write"}],
                rule: {name: "can be hired and has developer profession", matchers: [canBeHired, devProfession]}
              },
              {
                group: "hr",
                color: "3",
                permissions: [{permission: "hr:hire"},{permission: "hr:fire"}],
                rule: {name: "can be hired", matchers: [canBeHired]}
            },
              {
                group: "managers",
                color: "2",
                permissions: [{permission: "code:edit"}, {permission: "code:write"}, {permission: "hr:hire"}, {permission: "hr:fire"}],
                rule: {name: "can be hired", matchers: [canBeHired]}
            }
            ], 
            status: 200
          })
    }

    private createTokenConfig = () => {
        const token = new Cookies().get("jwt_token")
        return {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
    }   

    addGroup(group: AddGroup): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.addGroup(), group, config);
    }

    fetchGroups(): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        console.log(URICreator.fetchGroups())
        return axios.get(URICreator.fetchGroups(), config)
    }

    removeGroup(group: string): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removeGroup(group), {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
    }    

    removePermissionFromGroup(permission: string, group: string) {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removePermissionFromGroup(group), {
            headers: {
                Authorization: "Bearer " + token,
              },
              data: {permission: permission}

        })
    }

    assignPermissionToGroup(permission: string, group: string) {
        let config = this.createTokenConfig()
        return axios.post(URICreator.addPermissionToGroup(group), {permission: permission}, config)
    }

    putRule(rule: Rule, group: string) {
        let config = this.createTokenConfig()
        return axios.put(URICreator.putRule(group), rule, config)
    }
}

export default new GroupsClient();
