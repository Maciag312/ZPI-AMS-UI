import axios, { AxiosResponse } from "axios";
import Client from "../../common/Client";
import { host } from "./AuthorizationServerConfig";
import { ClientClient } from "./ClientClient";
import URICreator from "./URICreator";

class ClientClientImpl implements ClientClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  add(client: Client): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.addClient(this.host), client);
  }
}

export default new ClientClientImpl(host);
