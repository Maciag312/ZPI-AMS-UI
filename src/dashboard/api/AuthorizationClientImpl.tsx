import axios, { AxiosResponse } from "axios";
import { ManagerClient } from "./ManagerClient";
import URICreator from "./URICreator";
import Creds from "../../common/Creds";

class ManagerClientImpl implements ManagerClient {
  
  signIn(creds: Creds): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.signInURI(), creds);
  }
}

let authorizationClientInstance = new ManagerClientImpl();

export default authorizationClientInstance;
