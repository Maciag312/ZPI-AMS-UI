import axios, { AxiosResponse } from "axios";
import { ManagerClient } from "./ManagerClient";
import { host } from "./AuthorizationServerConfig";
import URICreator from "./URICreator";
import Creds from "../../common/Creds";

class ManagerClientImpl implements ManagerClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  signIn(creds: Creds, organization: string): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.signInURI(this.host, organization), creds);
  }
}

let authorizationClientInstance = new ManagerClientImpl(host);

export default authorizationClientInstance;
