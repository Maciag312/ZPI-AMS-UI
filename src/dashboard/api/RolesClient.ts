import axios, { AxiosResponse } from "axios";
import URICreator from "./URICreator";
import Cookies from "universal-cookie";
import AddRole from "../../common/AddRole";

class RolesClient  {
    
    fetchStubRoles(): Promise<any> {
        return Promise.resolve({
            data : [
              {role: "admin", color: "1", permissions: [{permission: "blog:edit"}, {permission: "blog:write"}, {permission: "blog:modify"}]},
              {role: "journalist", color: "1", permissions: [{permission: "blog:edit"}, {permission: "blog:write"}]},
              {role: "manager", color: "2", permissions: []}
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

    addRole(role: AddRole): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.addRole(), role, config);
    }

    fetchRoles(): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        console.log(URICreator.fetchRoles())
        return axios.get(URICreator.fetchRoles(), config)
    }

    removeRole(role: string): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removeRole(role), {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
    }    

    removePermissionFromRole(permission: string, role: string) {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removePermissionFromRole(role), {
            headers: {
                Authorization: "Bearer " + token,
              },
              data: {permission: permission}

        })
    }

    assignPermissionToRole(permission: string, role: string) {
        let config = this.createTokenConfig()
        return axios.post(URICreator.addPermissionToRole(role), {permission: permission}, config)
    }
}

export default new RolesClient();
