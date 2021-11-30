import axios, { AxiosResponse } from "axios";
import URICreator from "./URICreator";
import Cookies from "universal-cookie";
import Permission from "../../common/Permission";

class PermissionsClient  {
    fetchStubPermissions(): Promise<any> {
        return Promise.resolve({
            data : [
              {permission: "blog:edit"},
              {permission: "blog:write"},
<<<<<<< HEAD
              {permission: "blog:modify"}
=======
              {permission: "blog:modify"},
              {permission: "hr:fire"},
              {permission: "hr:hire"},
              {permission: "code:write"},
              {permission: "code:edit"},

>>>>>>> ZPI-add-groups-ams
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

    addPermission(permission: Permission): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.addPermission(), permission, config);
    }

    fetchPermissions(): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        console.log(URICreator.fetchPermissions())
        return axios.get(URICreator.fetchPermissions(), config)
    }

    removePermission(permission: string): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removePermission(permission), {
            headers: {
                Authorization: "Bearer " + token,
              },
        })
    }    
    
}

export default new PermissionsClient();
