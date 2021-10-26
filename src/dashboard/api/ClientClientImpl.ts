import axios, { AxiosResponse } from "axios";
import Client from "../../common/Client";
import { ClientClient } from "./ClientClient";
import URICreator from "./URICreator";
import Cookies from "universal-cookie";

class ClientClientImpl implements ClientClient {
    
    private createTokenConfig = () => {
        const token = new Cookies().get("jwt_token")
        return {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
    }

    add(client: Client): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        let config = {
            headers: {
              Authorization: "Bearer " + token,
            }
        }
          
        return axios.post(URICreator.addClient(), client, config);
    }

    fetchClients(): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        return axios.get(URICreator.fetchClientsURI(), config)
    }

    removeClient(id: string): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        return axios.delete(URICreator.removeClient(id), config)
    }

    removeURIFromClient(id: string, uri: string): Promise<AxiosResponse<any>> {
        const token = new Cookies().get("jwt_token")
        return axios.delete(URICreator.removeURIFromClient(id), {
            headers: {
                Authorization: "Bearer " + token,
              },
            data: {redirectURI: uri}

        })
    }
    
    addURIToClient(id: string, uri: string): Promise<AxiosResponse<any>> {
        let config = this.createTokenConfig()
        return axios.post(URICreator.removeURIFromClient(id), {redirectURI: uri}, config)
    }
}

export default new ClientClientImpl();
