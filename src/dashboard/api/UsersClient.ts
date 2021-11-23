import axios, { AxiosResponse } from "axios";
import URICreator from "./URICreator";
import Cookies from "universal-cookie";
import AddUser from "../../common/AddUser";

class UsersClient  {
    putUserAttributes(email: string, attributes: any) {
      const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.put(URICreator.userAttributes(), {
          userEmail: email,
          attributes: attributes
        }, config);
    }


    removeRoleFromUser(email: string, role: string) {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removeRoleFromUser(), {
            headers: {
                Authorization: "Bearer " + token,
              },
            data: {email: email, role: role}

        })
    }
   
    assignRoleToUser(email: string, role: string) {
      const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.assignRoleToUser(), {email: email, role: role}, config);
    }
    
    
    private createTokenConfig = () => {
        const token = new Cookies().get("jwt_token")
        return {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
    }   

    addUser(user: AddUser): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.addUser(), user, config);
    }

    fetchUsers(): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        console.log(URICreator.fetchUsers())
        return axios.get(URICreator.fetchUsers(), config)
    }
    fetchUserStub(): Promise<any> {
        return Promise.resolve({
            data : [
              {username: "JohnSmith", email: "john@smith.com",  isActive: false},
              {username: "SamSmith", email: "sam@smith.com", isActive: true}
            ], 
            status: 200
          })
    }

    removeUser(User: string): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removeUser(), {
            headers: {
                Authorization: "Bearer " + token,
              },
            data: {User: User}

        })
    }    

    fetchUserInfo(email: string) {
        let config = this.createTokenConfig()
        console.log(URICreator.fetchUsers())
        return axios.post(URICreator.fetchUserInfo(), {email: email} ,config) 
    }

    fetchUserInfoStub(email: string) {
        return Promise.resolve({
            data : 
              {email: "john@smith.com", 
              permissions: 
                [{permission: "blog:edit"},
                {permission: "blog:edit"}],
              roles: ["admin", "writer"],
              attributes: {attribute1: "value1", attribute2: "value2", attribute3: "value3"}},
            status: 200
          })
    }
    
}

export default new UsersClient();
